import _ = require("lodash");
import fs = require("fs");
import path = require("path");
import async = require("async");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);

function getModuleDefinitions(
  options: {
    searchNodeModules: boolean;
    excludes: string[];
  },
  callback: (err: Error, moduleDefinitions: mykoop.ModuleDefinition[]) => void
) {
  if(options.searchNodeModules) {
    var nodeModulesPath = path.resolve("node_modules");
    async.waterfall([
      // List the content of node_modules
      _.partial(fs.readdir, nodeModulesPath),
      function(nodeModules, callback) {
        async.concat(nodeModules,
          function(nodeModule, callback: (err, definition: any) => void) {
            try {
              var pkgPath = path.resolve(nodeModulesPath, nodeModule, "package.json");
              var pkg = require(pkgPath);
              // check if the package.json has what is required to be a valid
              // mykoop module
              if(
                !_.isString(pkg.name) ||
                !_.isString(pkg.role) ||
                !_.isPlainObject(pkg.mykoop)
              ) {
                logger.silly("[%s] is not a plugin for MyKoop", pkgPath);
                return callback(null, []);
              }
              var definition: mykoop.ModuleDefinition = {
                name: /^(?:mykoop-)?(.*)$/i.exec(pkg.name)[1],
                role: pkg.role,
                dependencies: _.isPlainObject(pkg.mykoop.dependencies) ?
                  Object.keys(pkg.mykoop.dependencies) : []
              }
              logger.silly("Adding definition for module [%s]", pkg.name, definition);
              callback(null, definition);
            } catch(e) {
              logger.silly("Trying to read [%s]", pkgPath);
              callback(null, []);
            }
          },
          callback
        );
      }
    ], function(err, moduleDefinitions: any) {
      if(err) {
        return callback(err, null);
      }

      filterModuleDefinitions(moduleDefinitions);
    });
  } else {
    filterModuleDefinitions(require("../../modules.json5").modules);
  }

  function filterModuleDefinitions(moduleDefinitions: mykoop.ModuleDefinition[] ) {
    var excludesRegExp = _.map(options.excludes, function (exclude) {
      return new RegExp("^(mykoop-)?" + exclude + "$", "i");
    });

    logger.verbose("Filtering excluded modules");
    moduleDefinitions = _.filter(moduleDefinitions, function(moduleDefinition: any) {
      if(moduleDefinition.name && moduleDefinition.role) {
        var isModuleExcluded = _.some(excludesRegExp, function(excludeRegExp) {
          return excludeRegExp.test(moduleDefinition.name);
        });

        logger.debug("Module [%s] %s",
          moduleDefinition.name,
          isModuleExcluded ? "excluded" : "kept"
        );
        return !isModuleExcluded;
      }
      logger.debug("Module missing name or role", moduleDefinition);
      return false;
    });

    callback(null, moduleDefinitions);
  }
}
export = getModuleDefinitions;
