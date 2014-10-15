import express = require("express");

export class Router implements mykoop.Router {
  constructor(public express: express.Express){
  }

  addRoutes(callback: (router: express.Router) => string, options?: mykoop.RouterOptions){
    var router = express.Router(options);
    var path = callback(router);
    this.express.use(path, router);
  }

}
