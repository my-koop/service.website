//TODO: Make this file in TypeScript.
var actions = {};

module.exports = actions;

var _ = require("lodash");
var ajax = require("ajax");
var endpoints = require("dynamic-metadata").endpoints;

function requestFactory(params) {
  var requestPath = params.path || "/";
  var method = params.method;
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

    if (!args.data) {
      args.data = {};
    }

    //FIXME: Remove this at one point.
    if (args.query) {
      console.warn("The usage of the \"query\" property has been deprecated.");
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

function actionsFromEndpoints(endpoints, actions) {
  _.forEach(endpoints, function (endpoint, actionName) {
    if (endpoint.hasOwnProperty("path")) {
      // No children...
      actions[actionName] = requestFactory({
        path: endpoint.path,
        method: endpoint.method
      });
    } else {
      actions[actionName] = {};
      actionsFromEndpoints(endpoint, actions[actionName]);
    }
  });
}

actionsFromEndpoints(endpoints, actions);
