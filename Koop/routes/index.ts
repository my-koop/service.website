/*
 * GET home page.
 */
import express = require('express');
import ctrl = require('./controllers/index');
import routeInfo = require('../Scripts/modules/routeInformation');

function indexApp(app: express.Express) {

  //FIXME: Routes in the backend will be different to those in the front-end,
  // although they may be subsets of those in the front-end and/or use another
  // HTTP method. e.g. /users/posts could be handled by the backend while
  // /users maps to the front-end.
  for (var i = 0; i < routeInfo.frontEndPages.length; ++i) {
    app.get(routeInfo.frontEndPages[i].fullPath, ctrl.staticRoot);
  }

  // Backend routes.
  app.get(routeInfo.devNavBar.fullPath, ctrl.navBar);
}
export = indexApp;
