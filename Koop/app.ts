///<reference path="Scripts/typings/tsd.d.ts" />
import express = require('express');
import http = require('http');
import path = require('path');
import logger = require('morgan');
import methodOverride = require('method-override');
import session = require('express-session');
import bodyParser = require('body-parser');
import errorHandler = require('errorhandler');
var favicon = require('serve-favicon');
var multer = require('multer');

var app = express();
import routes = require('./routes/index');
routes(app);

// all environments
app.set('port', process.env.PORT || 3000);
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
app.use(express.static(path.join(__dirname, 'public')));

// For now "catch-all" requests that are not mapped to let the front-end manage
// these routes.
app.get('*', function(req, res) {
  // Valid route in the front-end, we only want to send the index.
  if (res.locals.isFrontEnd) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
    return;
  }

  // Unknown route.
  res.status(404).send("Not found");
});

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
