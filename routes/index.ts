﻿/*
 * GET home page.
 */
import express = require("express");
import _ = require("lodash");
import ctrl = require("./controllers/index");
import routeInfo = require("../modules/common/routeInformation");
import moduleManager = require("../modules/backend/moduleManager");

function routeListFromRouteTree(routes: any, basePath?: string) {
  basePath = basePath || "";

  return _.reduce(routes, function (routeList: string[], route: any) {
    var currentPath = basePath;

    if (route.hasOwnProperty("path")) {
      if (route.path.charAt(0) === "/") {
        currentPath = route.path;
      } else {
        currentPath += "/" + route.path;
      }
    } else if (route.hasOwnProperty("default")) {
      routeList.push(currentPath);
    }

    if (route.hasOwnProperty("children")) {
      routeList = routeList.concat(routeListFromRouteTree(route.children, currentPath));
    } else if (!route.hasOwnProperty("default")) {
      routeList.push(currentPath);
    }

    return routeList;
  }, []);
}

function indexApp(app: express.Express) {

  //FIXME: (Legacy) Front-end static routes.
  for (var i = 0; i < routeInfo.frontEndPages.length; ++i) {
    app.get(routeInfo.frontEndPages[i].fullPath, ctrl.staticRoot);
  }

  // Map all possible static routes/route patterns.
  // Change this if it becomes async...
  var routes;
  moduleManager.getMetaData(function (err, metaDataResult) {
    routes = metaDataResult.routes;
  });

  routeListFromRouteTree(routes).forEach(function (route) {
    app.get(route, ctrl.staticRoot);
  });

  //FIXME: (Legacy) Backend routes.
  app.get(routeInfo.devNavBar.fullPath, ctrl.navBar);
  app.get(routeInfo.itemsData.fullPath, ctrl.itemsData);
  app.get(routeInfo.itemsBelowThreshold.fullPath, ctrl.itemsThreshold);
}
export = indexApp;
