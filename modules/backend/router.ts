import express = require("express");
import utils = require("mykoop-utils");
import _ = require("lodash");
var logger = utils.getLogger(module);

export class Router extends utils.BaseModule implements mykoop.Router {
  constructor(public express: express.Express) {
    super();
  }
  // Allows us to assign a controller to an endpoint.
  addRoute(
    params: mykoop.RouteParams,
    callback: (
      req: express.Request,
      res: express.Response,
      next: Function
    ) => void
  ){
    var endpoint = params.endPoint;
    var path = endpoint.path;
    var method = endpoint.method || "get";
    var type = endpoint.type;
    var middlewares: any[] = [callback];

    // Attach automatic validation on request
    if(_.isFunction(params.validation)) {
      function validationMiddleWare(
        req: express.Request,
        res: express.Response,
        next: Function
      ) {
        var errors = params.validation(res.locals.data);
        if(errors) {
          logger.info(errors, {});
          res.status(400);
          res.send(new Error(<any>errors));
          return;
        }
        next();
      }
      middlewares.unshift(validationMiddleWare);
    }


    // Most requests will be of the JSON type, hence we default to it.
    if (type === undefined) {
      type = "json";
    }

    path = (type === null ? "" : "/") + type + path;
    middlewares.unshift(path);
    //TODO: Add to this middleware chain (or attach to the request object)
    // information/handling pertaining to the permissions. Consider adding
    // validation here too...
    this.express[method].apply(this.express, middlewares);
  }
}
