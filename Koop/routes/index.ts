/*
 * GET home page.
 */
import express = require('express');
import ctrl = require('./controllers/index');
import routeInfo = require('../Scripts/modules/RouteInformation');

function indexApp(app: express.Express) {
    app.get('/', ctrl.homepage);
    app.get(routeInfo.userRoute, ctrl.user);
    app.get(routeInfo.navBarRoute, ctrl.navBar);
}
export = indexApp;