import _ = require("lodash");
import fs = require("fs");
import path = require("path");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);

function getModulesDefinitions(
  options: {
    searchNodeModules?: boolean;
    excludes?: string[];
    path?: string;
  }
): mykoop.ModuleDefinition[] {
  var moduleDefinitions: mykoop.ModuleDefinition[] = [];

  if(options.searchNodeModules) {
    var nodeModulesPath = path.resolve("node_modules");
    // List the content of node_modules
    var nodeModules: string[] = fs.readdirSync(nodeModulesPath);
    var moduleDefinitions: mykoop.ModuleDefinition[] = _.reduce(nodeModules,
      function(moduleDefinitions: mykoop.ModuleDefinition[], nodeModule) {
        try {
          var pkgPath = path.resolve(nodeModulesPath, nodeModule, "package.json");
          var pkg = require(pkgPath);
        } catch(e) {
          logger.silly("Error while trying to read [%s]", pkgPath);
          return moduleDefinitions;
        }
        // check if the package.json has what is required to be a valid
        // mykoop module
        if(
          !_.isString(pkg.name) ||
          !_.isString(pkg.role) ||
          !_.isPlainObject(pkg.mykoop)
        ) {
          logger.silly("[%s] is not a plugin for MyKoop", pkgPath);
          return moduleDefinitions;
        }

        var definition: mykoop.ModuleDefinition = {
          name: /^(?:mykoop-)?(.*)$/i.exec(pkg.name)[1],
          role: pkg.role,
          dependencies: _.isPlainObject(pkg.mykoop.dependencies) ?
            Object.keys(pkg.mykoop.dependencies) : []
        }
        logger.silly("Adding definition for module [%s] at [%s]",
          pkg.name,
          pkgPath,
          definition
        );
        moduleDefinitions.push(definition);
        return moduleDefinitions;
      },
      []
    );
  } else {
    try {
      moduleDefinitions = require(options.path).modules;
    } catch(e) {
      logger.error("Error while trying to read [%s]", options.path);
    }
  }

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

  return moduleDefinitions;
}
export = getModulesDefinitions;
