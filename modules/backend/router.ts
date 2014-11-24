import express = require("express");
import utils = require("mykoop-utils");

var ValidationError = utils.errors.ApplicationError.ValidationError;
var AccessDeniedError = utils.errors.ApplicationError.AccessDeniedError;

import _ = require("lodash");
var logger = utils.getLogger(module);

export class Router extends utils.BaseModule implements mykoop.Router {
  constructor(public express: express.Express) {
    super();
  }
  // Allows us to assign a controller to an endpoint.
  addRoute(
    params: mykoop.RouteParams,
    callback: express.Handler[]
  ){
    var endpoint = params.endPoint;
    var path = endpoint.path;
    var method = endpoint.method || "get";
    var type = endpoint.type;
    var middlewares: any[] = _.isFunction(callback) ? [callback] : callback;

    var customPermissionDenied = params.customPermissionDenied;
    var customPermissionGranted = params.customPermissionGranted;
    var permissions = params.permissions;
    if(permissions || customPermissionGranted) {
      permissions = permissions || {};

      function permissionDenied(
        res: express.Response
      ) {
        res.error(new AccessDeniedError(null, {}));
      }

      function permissionValidation(
        req: express.Request,
        res: express.Response,
        next: Function
      ) {
        function customPermissionValidation(err) {
          err ? permissionDenied(res) : next();
        }

        if (!req.userHasPermissions(permissions)) {
          if (customPermissionDenied) {
            return customPermissionDenied(
              req,
              customPermissionValidation
            );
          }

          return permissionDenied(res);
        }

        if (customPermissionGranted) {
          return customPermissionGranted(
            req,
            customPermissionValidation
          );
        }

        next();
      }

      middlewares.unshift(permissionValidation);
    }

    // Attach automatic validation on request
    if(_.isFunction(params.validation)) {
      function validationMiddleWare(
        req: express.Request,
        res: express.Response,
        next: Function
      ) {
        var errors = params.validation(_.merge(req.params, req.body, req.query));
        if(errors) {
          logger.info(errors, {});
          res.error(new ValidationError(null, errors, "Validation Errors"), 400);
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
