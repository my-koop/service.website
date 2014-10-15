///<reference path="typings/tsd.d.ts" />
import express = require('express');
import http = require('http');
import path = require('path');
import logger = require('morgan');
import methodOverride = require('method-override');
import session = require('express-session');
import bodyParser = require('body-parser');
import errorHandler = require('errorhandler');
import moduleManager = require('./modules/backend/moduleManager');
//hijack require to parse json5
require('json5/lib/require');

var favicon = require('serve-favicon');
var multer = require('multer');

var app = express();
import routes = require('./routes/index');
routes(app);

// Setting core modules
import router = require("./modules/backend/router");
moduleManager.setCore("router", new router.Router(app));

// Loading modules
console.log("Loading modules...");
var modules = require("./modules.json5");
moduleManager.loadModules(modules.modules);
moduleManager.initializeLoadedModules();

// all environments
app.set('port', process.env.PORT || 1337);
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// development only
if ('development' == app.get('env')) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
