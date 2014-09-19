/*
 * GET home page.
 */
import express = require('express');
import ctrl = require('./controllers/index');
import routeInfo = require('../Scripts/modules/routeInformation');

// Any route that will be routed the front-end should pass by this.
function isFrontEnd(req, res, next) {
  res.locals.isFrontEnd = true;
  next();
}

function indexApp(app: express.Express) {

  //FIXME: Routes in the backend will be different to those in the front-end,
  // although they may be subsets of those in the front-end and/or use another
  // HTTP method. e.g. /users/posts could be handled by the backend while
  // /users maps to the front-end.
  app.get(routeInfo.homepage, isFrontEnd);
  app.get(routeInfo.users, isFrontEnd);

  // Backend routes.
  app.get(routeInfo.navBar, ctrl.navBar);
}
export = indexApp;
