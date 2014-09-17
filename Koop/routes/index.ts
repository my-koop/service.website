/*
 * GET home page.
 */
import express = require('express');
import ctrl = require('./controllers/index');
import routeInfo = require('../Scripts/modules/routeInformation');

function indexApp(app: express.Express) {
    app.get(routeInfo.userRoute, ctrl.user);
    app.get(routeInfo.navBar, ctrl.navBar);
}
export = indexApp;