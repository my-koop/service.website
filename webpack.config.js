var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var beautify = require("js-beautify").js_beautify
var webpack = require("webpack");
var utils = require("mykoop-utils");
var moduleManager = require("./modules/backend/moduleManager");
//hijack require to parse json5
require('json5/lib/require');

var isDev = utils.__DEV__;
var isProd = utils.__PROD__;

var pluginList = [
  new webpack.DefinePlugin({
    __DEV__: isDev,
    __PROD__: isProd,
    "process.browser": true
  }),

  // This might seem like a wide net, but we don't want anything that has to do
  // with jQuery, by default anyway.
  new webpack.IgnorePlugin(/jquery/)
];

if (isProd) {
  // Minify and optimize assets. (JS, CSS)
  // This can take a couple of seconds, only use for
  // the production bundles.
  pluginList.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_console: true
    }
  }));
}

var modules = require("./modules.json5");
moduleManager.loadModules(modules.modules);
var loadedModules = moduleManager.getLoadedModulePairings();

/* Generate dynamic LESS imports for the global scope. */
var lessGlobalStyles = _.reduce(loadedModules, function(lessStyles, moduleName) {
  var stylePath = moduleName + "/styles/index.less";

  try {
    require.resolve(stylePath);
  } catch(e) {
    // Abort trying to load styles for this module.
    return lessStyles;
  }

  lessStyles.push("@import \"~" + stylePath + "\";");

  return lessStyles;
}, []);

fs.writeFileSync(
  "./styles/dynamic-global-styles.less",
  lessGlobalStyles.join("\n")
);

var styleLoaders = [
  "style",
  "css",
  "autoprefixer?" + {
    "browsers": [
      "last 2 versions",
      "ie 8",
      "ie 9",
      "android 2.3",
      "android 4",
      "opera 12"
    ]
  },
  "less"
];

var lessLoader = {
  test: /\.less$/,
  exclude: /\.useable\.less$/,
  loaders: _.clone(styleLoaders)
};

styleLoaders[0] += "/useable";
var lessUseableLoader = {
  test: /\.useable\.less$/,
  loaders: styleLoaders
};

var aliases = _.reduce(loadedModules, function(aliases, moduleName, moduleRole) {
  var modulePath;

  try {
    modulePath = require.resolve(moduleName);
  } catch(e) {
    // Abort trying to load the alias for this module.
    return aliases;
  }

  if (moduleName !== moduleRole) {
    aliases[moduleRole] = moduleName;
  }

  return aliases;
}, {
  "bootstrap-styles": "bootstrap/less",
  "font-awesome-styles": "font-awesome/less",
   //FIXME: One day, these components will be core only.
  components: path.join(__dirname, "components"),
  "i18next": "i18next-client"
});

/* Generate a temporary file with the meta data. */
dynamicMetadataFileContent = "/** DYNAMICALLY GENERATED - DO NOT EDIT **/\n\n";

var metaData;
moduleManager.getMetaData(function (err, modulesMetaData) {
  metaData = modulesMetaData;
});

function generateIntermediaryRequires(obj) {
  if (_.isPlainObject(obj)) {
    if (
      obj.hasOwnProperty("origin")
    ) {
      // Consider this a leaf that needs to be resolved.
      var requireString = "__require(";

      requireString += obj.origin + ")";

      if (obj.hasOwnProperty("property")) {
        requireString += "." + obj.property;
      }

      requireString += "__";

      return requireString;
    }

    _.forEach(obj, function (value, key) {
      obj[key] = generateIntermediaryRequires(value);
    });
  }

  return obj;
}

var metaDataString;
metaData = generateIntermediaryRequires(metaData);

try{
  metaDataString = JSON.stringify(metaData);
} catch(e) {
  console.error("Invalid intermediary meta data, couldn't generate dynamic dependencies.");
}

if (metaDataString) {
  metaDataString = beautify(metaDataString, {indent_size: 2});
  metaDataString = metaDataString.replace(
    /\"__require\((.*?)\)(\..*?)?__\"/g,
    "function() { return require(\"$1\")$2; }"
  );

  dynamicMetadataFileContent += "module.exports = " + metaDataString + ";\n";

  fs.writeFileSync(
    "./modules/frontend/dynamic-metadata.js",
    dynamicMetadataFileContent
  );
}

var loaderList = [
  // Styles.
  lessLoader,
  lessUseableLoader,

  // Fonts.
  // See: https://github.com/webpack/webpack/issues/460
  { test: /\.woff($|\?)/, loader: "url?prefix=fonts/&limit=5000&mimetype=application/font-woff" },
  { test: /\.ttf($|\?)/,  loader: "file?prefix=fonts/" },
  { test: /\.eot($|\?)/,  loader: "file?prefix=fonts/" },
  { test: /\.svg($|\?)/,  loader: "file?prefix=fonts/" },

  // Images.
  { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192"},

  // JSON files (Mostly used for languages).
  { test: /\.json$/,   loader: "json" },
  { test: /\.json5$/,  loader: "json5" },

  // JSX (for React)
  { test: /\.js$/,   loader: "jsx" },
  { test: /\.jsx$/,  loader: "jsx?insertPragma=React.DOM" },

  // TypeScript.
  { test: /\.ts$/,   loader: "ts" },
];

if (isDev) {
  // Expose React in the global space so we can use the React chrome Dev Tools.
  loaderList.push({
    test: require.resolve("react"), loader: "expose?React"
  });
}

module.exports = {
  // Where to look for the entry points.
  context: path.join(__dirname, "entry"),
  entry: {
    "mykoop" : "./mykoop",
  },
  output: {
    path: path.join(__dirname, "public/"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/"
  },
  module: {
    loaders: loaderList,
    // FIXME:: Webpack must not parse this module because cannot be statically
    // analysed
    noParse: /validate\.js/
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".ts", ".jsx"],

    root: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "locales"),
      path.join(__dirname, "modules", "frontend"),
      path.join(__dirname, "modules", "common")
    ],

    modulesDirectories: [
      "node_modules",
      "bower_components"
    ],

    // Map the modules to the files we really need, for hassle-free inclusion
    // in our files.
    alias: aliases
  },
  plugins: pluginList
};
