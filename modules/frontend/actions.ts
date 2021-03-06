///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");
import ajax = require("./ajax");
var __ = require("language").__;
var traverse = require("traverse");
var endpoints = require("dynamic-metadata").endpoints;
var globalSpinner = require("mykoop-core/components/Spinner");
var globalAlert = require("mykoop-core/components/AlertTrigger");
var errorVarRegExp = /__(.+)__/;

function requestFactory(params: any) {
  var requestPath = params.path || "/";
  var method = params.method;
  var splitPath;
  var validation = params.validation;
  var validate: (obj: any) => any = _.noop;
  var paramsIdentifiers = [];

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
    paramsIdentifiers = _.filter(splitPath, function(pathPart: string) {
      return pathPart.charAt(0) === ":";
    }).map(function(pathPart) {
      return pathPart.substr(1);
    });
  }

  return function (args, callback) {
    if (_.isFunction(args)) {
      callback = args;
      args = {};
    }
    if(!_.isFunction(callback)) {
      callback = _.noop;
    }
    args.i18nErrors = args.i18nErrors || {};

    function processResponse(err, body?, res?) {
      if(err && args.i18nErrors) {
        var prefix = args.i18nErrors.prefix ? args.i18nErrors.prefix + "." : "";
        var keys: any = _.pick(err, args.i18nErrors.keys);
        var i18n = null;
        if(!_.isEmpty(keys)) {
          var i18n = traverse(keys).reduce(function(i18n, content) {
            if(this.isLeaf) {
              var i18nVar: any = errorVarRegExp.exec(content);
              i18nVar = i18nVar && i18nVar[1];
              if (i18nVar && content && content.replace) {
                var i18nKey = prefix + this.path
                  .concat(content.replace(errorVarRegExp, ""))
                  .join(".")
                  .replace(/\.\d+\./g, ".");
                i18n.push({
                  key: i18nKey,
                  variable: i18nVar
                });
              }
            }
            return i18n;
          }, []);
        }
        (<any>err).i18n = !_.isEmpty(i18n) ?
          i18n
        : [{key: "errors::error", context: err.context}];
        if(args.alertErrors) {
          var errorMessage = _.map(err.i18n, function(i18nError: any) {
            return __(i18nError.key, i18nError);
          }).join("\n");
          console.error(err);
          globalAlert.showAlert(errorMessage);
        }
      }
      if(!err && args.alertSuccess) {
        globalAlert.showAlert(__("success"));
      }
      callback(err, body, res);
    }

    var validationErrors = validate(args.data);
    if(validationErrors) {
      return processResponse({
        context: "validation",
        path: requestPath,
        validation: validationErrors,
        app: validationErrors
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
            processResponse(
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
      var requestReceived = false, spinnerShown = false;
      setTimeout(
        function() {
          if(!requestReceived) {
            spinnerShown = true;
            globalSpinner.showGlobalSpinner();
          }
        }
        , 500
      );

      var finalCallback = callback;
      callback = function() {
        requestReceived = true;
        if(spinnerShown) {
          globalSpinner.hideGlobalSpinner();
        }
        finalCallback.apply(ajax, arguments);
      }
    }
    ajax.request({
      endpoint: __SERVICE_URL__ + "/json" + requestPath,
      method: method,
      data: _.omit(args.data, paramsIdentifiers)
    }, processResponse);
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
