import express = require("express");

export class Router implements mykoop.Router {
  constructor(public express: express.Express){
  }

  // Allows us to server a controller to an endpoint.
  addRoute(
    params: mykoop.RouteParams,
    callback: (
      req: express.Request,
      res: express.Response,
      next: Function
    ) => void
  ){
    var path = params.endPoint.path;
    var method = params.endPoint.method || "get";
    var type = params.endPoint.type;

    // Most requests will be of the JSON type, hence we default to it.
    if (type === undefined) {
      type = "json";
    }

    path = (type === null ? "" : "/") + type + path;

    //TODO: Add to this middleware chain (or attach to the request object)
    // information/handling pertaining to the permissions. Consider adding
    // validation here too...
    this.express[method](path, callback);
  }
}
