import _ = require("lodash");
import getLogger = require("mykoop-logger");
var logger = getLogger(module);

function getModuleDefinitions(
  options: {
    searchNodeModules: boolean;
    excludes: string[];
  },
  callback: (err: Error, modulesDefinitions: mykoop.ModuleDefinition[]) => void
) {
  var moduleDefinitions;
  if(options.searchNodeModules) {

  } else {
    moduleDefinitions = require("../../modules.json5").modules;
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

  callback(null, moduleDefinitions);
}
export = getModuleDefinitions;
