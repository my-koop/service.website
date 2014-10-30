///<reference path="typings/tsd.d.ts" />
import express = require("express");
import http = require("http");
import path = require("path");
import logger = require("morgan");
import methodOverride = require("method-override");
import session = require("express-session");
import bodyParser = require("body-parser");
import errorHandler = require("errorhandler");
import moduleManager = require("./modules/backend/moduleManager");
import getModuleDefinitions = require("./modules/backend/getModuleDefinitions");
import utils = require("mykoop-utils");
import router = require("./modules/backend/router");
import async = require("async");
var favicon = require("serve-favicon");
var multer = require("multer");
// Frontend routes
import addFrontendRoutes = require("./routes/index");
//hijack require to parse json5
require("json5/lib/require");

var program = require("commander");
program
  .option(
    "-n, --node_module",
    "Loads the plugins from the node module that have a key \"mykoop\" in their package.json"
  )
  .option("-e, --exclude <plugin1;...>",
    "Exclude plugins by their name (semicolon seperated).\n\
     ie: \"-e user;inventory\" will exclude plugins mykoop-user & mykoop-inventory"
  )
  .parse(process.argv);
program.exclude = program.exclude ? program.exclude.split(";") : [];

function logSequenceStep(step) {
  var args = Array.prototype.slice.call(arguments,1);
  console.log(step);

  var callback = args.pop();
  callback.apply(null, [null].concat(args));
}

// Launch application sequence
async.waterfall([
  logSequenceStep.bind(null, "Initiating Application"),
  initApplication,
  logSequenceStep.bind(null, "Loading Modules"),
  loadModules,
  logSequenceStep.bind(null, "Adding Middleware for all routes"),
  addMiddleWareBeforeFrontendRoutes,
  logSequenceStep.bind(null, "Routing Frontend"),
  addFrontendRoutesWrapper,
  logSequenceStep.bind(null, "Adding Middleware for backend routes"),
  addMiddleWareAfterFrontEndRoutes,
  logSequenceStep.bind(null, "Initializing Modules & Routing Backend"),
  addBackEndRoutes
], startServer);

function startServer(err, app) {
  if(err) {
    return console.error(err);
  }

  http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
  });
}

function initApplication(callback) {
  var app = express();
  app.set("port", process.env.PORT || 1337);
  callback(null, app);
}

function loadModules(app, callback) {
  // Setting core modules
  moduleManager.setCore("router", new router.Router(app));

  var moduleDefinitionsOptions = {
    excludes: program.exclude,
    searchNodeModules: program.node_module
  };

  getModuleDefinitions(
    moduleDefinitionsOptions,
    function(err, modulesDefinitions: mykoop.ModuleDefinition[]) {
      if(err) {
        return callback(err);
      }
      // Loading modules
      moduleManager.loadModules(modulesDefinitions);
      callback(null, app);
    }
  );
}

function addMiddleWareBeforeFrontendRoutes (app, callback) {
  app.use(favicon(__dirname + "/public/favicon.ico"));
  app.use(logger("dev"));
  callback(null, app);
}

function addFrontendRoutesWrapper (app, callback) {
  addFrontendRoutes(app);
  callback(null, app);
}

function addMiddleWareAfterFrontEndRoutes (app, callback) {
  app.use(methodOverride());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "uwotm8"
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer());

  // development only
  if (utils.__DEV__) {
    app.use(errorHandler());
    app.use(express.static(path.join(__dirname, "public")));
  }
  callback(null, app);
}

function addBackEndRoutes (app, callback) {
  // Initialise module and add backend routes
  moduleManager.initializeLoadedModules();
  callback(null, app);
}

