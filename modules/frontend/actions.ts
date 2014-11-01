///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");
import ajax = require("./ajax");
var endpoints = require("dynamic-metadata").endpoints;

function requestFactory(params: any) {
  var requestPath = params.path || "/";
  var method = params.method;
  var validate = _.isFunction(params.validation) && params.validation() || _.noop();
  var splitPath;

  if (requestPath.charAt(0) !== "/") {
    console.warn(
      "All paths must start with a \"/\". Error with \"%s\".",
      requestPath
    );
  }

  if (params.path && ~params.path.indexOf(":")) {
    splitPath = params.path.split("/").splice(1);
  }

  return function (args, callback) {
    if (_.isFunction(args)) {
      callback = args;
      args = {};
    }
    var validationErrors = validate(args.data);
    if(validationErrors) {
      return callback(new Error(validationErrors));
    }
    args.data = args.data || {};

    //FIXME: Remove this at one point.
    if (args.query) {
      console.warn(
        "The usage of the \"query\" property has been deprecated in the " +
        "actions module. (Endpoint: \"%s\")",
        requestPath
      );
      args.data = _.merge(args.query, args.data);
    }

    var hasErrored;

    if (splitPath) {
      requestPath = splitPath.reduce(function (requestPath, pathPart) {
        if (pathPart.charAt(0) === ":") {
          var queryArgument = pathPart.substr(1);
          var queryValue = args.data[queryArgument];

          if (!queryValue && !hasErrored) {
            hasErrored = true;
            callback(
              new Error(
                "Couldn't build request, missing parameter: " + queryArgument
              )
            );
          }

          requestPath += "/" + queryValue;
        } else {
          requestPath += "/" + pathPart;
        }

        return requestPath;
      }, "");
    }

    if (hasErrored) {
      return;
    }

    ajax.request({
      endpoint: "/json" + requestPath,
      method: method,
      data: args.data
    }, callback);
  }
}

function actionsFromEndpoints(endpoints: any, actions: any) {
  _.forEach(endpoints, function (endpoint: any, actionName: string) {
    if (endpoint.hasOwnProperty("path")) {
      // No children...
      actions[actionName] = requestFactory(endpoint);
    } else {
      actions[actionName] = {};
      actionsFromEndpoints(endpoint, actions[actionName]);
    }
  });
}

var actions = {};
actionsFromEndpoints(endpoints, actions);

export = actions;
