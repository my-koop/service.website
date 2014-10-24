var actions = {};

module.exports = actions;

var _ = require("lodash");
var ajax = require("ajax");
var endpoints = require("dynamic-metadata").endpoints;

function requestFactory(params) {
  var requestPath = params.path || "/";
  var splitPath;

  if (params.path && ~params.path.indexOf(":")) {
    splitPath = params.path.split("/");
  }

  return function (args, callback) {
    if (_.isFunction(args)) {
      callback = args;
      args = {
        query: {}
      };
    }

    if (splitPath) {
      requestPath = splitPath.reduce(function (requestPath, pathPart) {
        if (pathPart.charAt(0) === ":") {
          requestPath += "/" + args.query[pathPart.substr(1)];
        } else {
          requestPath += "/" + pathPart;
        }

        return requestPath;
      }, "");
    }

    ajax.request({
      endpoint: "/json" + requestPath,
      method: params.method
    }, callback);
  }
}

function actionsFromEndpoints(endpoints, actionLevel)
  actionLevel = actionLevel || actions;

  _.forEach(endpoints, function (endpoint, actionName) {
    if (endpoint.hasOwnProperty("path")) {
      // No children...
      actionLevel[actionName] = requestFactory({
        path: endpoint.path,
        method: endpoint.method
      });
    } else {
      actionLevel[actionName] = {};
      actionsFromEndpoints(endpoint, actionLevel[actionName]);
    }
  });
}
