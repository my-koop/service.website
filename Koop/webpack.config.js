var env = process.env.NODE_ENV;
var path = require("path");
var _ = require("lodash");
var webpack = require("webpack");

var isDev = env === "development";
var isProd = env === "production";

var pluginList = [
  new webpack.DefinePlugin({
    __DEV__: isDev,
    __PROD__: isProd,
    __FRONTEND__: true
  })
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

var loaderList = [
  // Styles.
  lessLoader,
  lessUseableLoader,

  // Fonts.
  //FIXME: Removed $ in these tests, but this could be a problem with webpack.
  { test: /\.woff/, loader: "url?prefix=fonts/&limit=5000&mimetype=application/font-woff" },
  { test: /\.ttf/,  loader: "file?prefix=fonts/" },
  { test: /\.eot/,  loader: "file?prefix=fonts/" },
  { test: /\.svg/,  loader: "file?prefix=fonts/" },

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
  context: path.join(__dirname, "js/entry"),
  entry: {
    "mykoop" : "./index",
  },
  output: {
    path: path.join(__dirname, "public/"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/"
  },
  module: {
    loaders: loaderList
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".ts", ".jsx"],

    root: [
      path.join(__dirname, "js"),
      path.join(__dirname, "less"),
      path.join(__dirname, "locales"),
      path.join(__dirname, "Scripts", "modules")
    ],

    modulesDirectories: [
      "node_modules",
      "bower_components"
    ],

    // Map the modules to the files we really need, for hassle-free inclusion
    // in our files.
    alias: {
      "bootstrap-styles": "bootstrap/less",
      "font-awesome-styles": "font-awesome/less",
      components: path.join(__dirname, "components")
    }
  },
  plugins: pluginList
};
