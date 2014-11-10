///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");
import ajax = require("./ajax");
var endpoints = require("dynamic-metadata").endpoints;
var globalSpinner = require("mykoop-core/components/Spinner");

function requestFactory(params: any) {
  var requestPath = params.path || "/";
  var method = params.method;
  var splitPath;
  var validation = params.validation;
  var validate: (obj: any) => any = _.noop;

  if (validation) {
    if (!_.isFunction(validation) || !_.isFunction(validate = validation())) {
      console.error("Validation provided is not a function at ", requestPath);
      // revert to noop
      validate = _.noop;
    }
  }

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
      return callback({
        context: "validation",
        validation: validationErrors
      });
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

    if(!args.silent) {
      globalSpinner.showGlobalSpinner();
      var finalCallback = callback;
      callback = function() {
        globalSpinner.hideGlobalSpinner();
        finalCallback.apply(ajax, arguments);
      }
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
