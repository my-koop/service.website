///<reference path="typings/tsd.d.ts" />
import express = require("express");
import http = require("http");
import path = require("path");
import middlewareLogger = require("morgan");
import methodOverride = require("method-override");
import session = require("express-session");
import bodyParser = require("body-parser");
import errorHandler = require("errorhandler");
import _ = require("lodash");
import moduleManager = require("./modules/backend/moduleManager");
import utils = require("mykoop-utils");
import frontendCompilation = require("./modules/frontend/index");
import getModulesDefinitions = require("./modules/backend/getModulesDefinitions");
var logger = utils.getLogger(module);

// Define global variables to ensure coherence between backend and frontend
process.__PROD__ = utils.__PROD__;
__PROD__ = utils.__PROD__;
process.__DEV__ = utils.__DEV__;
__DEV__ = utils.__DEV__;

//hijack require to parse json5
require("json5/lib/require");

var program = require("commander");
program
  .option(
    "-n, --node_module",
    "Loads the plugins from the node module that have a key \"mykoop\" in their package.json"
  )
  .option(
    "-m, --modules [path]",
    "Specify the path to a config file containing the module list. Invalid with --node_module\n\
      Default = \"modules.json5\"\n\
      { modules: { name: string; role: string; dependencies?: stringp[] }[] }"
  )
  .option("-e, --exclude <plugin1;...>",
    "Exclude plugins by their name (semicolon seperated).\n\
     ie: \"-e user;inventory\" will exclude plugins mykoop-user & mykoop-inventory"
  )
  .parse(process.argv);
var moduleExcludes = program.exclude ? program.exclude.split(";") : [];
var modulePath = path.resolve(program.modules || "modules.json5");

var favicon = require("serve-favicon");
var multer = require("multer");

var app = express();

// Setting core modules
import router = require("./modules/backend/router");
moduleManager.setCore("router", new router.Router(app));

// Loading modules
logger.info("Loading modules...");
var modulesDefinitions = getModulesDefinitions({
  excludes: moduleExcludes,
  searchNodeModules: program.node_module,
  path: modulePath
});
moduleManager.loadModules(modulesDefinitions);

app.disable("etag");
// all environments
app.set("port", process.env.PORT || 1337);
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(middlewareLogger("dev"));

// Frontend routes
import routes = require("./routes/index");
routes(app);

app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  //FIXME: Get this out of GitHub. / Make this configurable.
  secret: "8bb6b8987c0e3244e30690cb9baf4d0a7085491f"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// development only
if (utils.__DEV__) {
  app.use(errorHandler());
  app.use(express.static(path.join(__dirname, "public")));
}


var loggingError: any = [
  /*0*/_.noop,
  /*1*/_.noop,
  /*2*/_.noop,
  /*3*/_.noop,
  /*4*/_.bind(logger.verbose, logger),
  /*5*/_.bind(logger.error, logger)
]
function errorResponse(err, status) {
  status = status || err.statusCode || 500;
  loggingError[Math.floor(status/100)](err);

  this.status(status);
  if(!err) {
    return this.end();
  }
  if(err instanceof utils.errors) {
    return this.send(err.serialize());
  }
  if(_.isFunction(err.toString)) {
    return this.send(err.toString());
  }
  this.send(err);
}

app.use(function (req, res, next) {
  res.error = errorResponse;
  next();
});

// Initialise module and add backend routes
moduleManager.initializeLoadedModules();

http.createServer(app).listen(app.get("port"), function () {
  logger.info("Express server listening on port " + app.get("port"));
});
