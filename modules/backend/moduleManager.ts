///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");
import mykoop = require("mykoop");

export interface ModuleDefinition {
  name: string;
  dependencies?: string[];
}

class Module {
  public instance: mykoop.IModule;

  constructor() {
    this.instance = null;
  }
}

export function get(moduleName: string): mykoop.IModule {
  return null;
}

export function initializeModules(moduleDefinitions: ModuleDefinition[]) {
  var modules = moduleDefinitions.reduce(function (modules, moduleDefinition, index) {
    var name = moduleDefinition.name;

    if (modules[name]) {
      console.error("Duplicate module: %s.", name);
      return modules;
    }

    modules[name] = new Module();

    return modules;
  }, {});

  var allDependenciesSatisfied = _.all(moduleDefinitions, function(moduleDefinition, index) {
    return _.all(
      moduleDefinition.dependencies,
      function(dependency) {
        return !!modules[dependency];
      }
    );
  });

  //TODO: Be more verbose about what doesn't have valid dependencies.
  if (!allDependenciesSatisfied) {
    console.error("Some dependencies are not satisfied.");
    return;
  }

  //TODO: Instanciate modules.
  moduleDefinitions.forEach(function(moduleDefinition) {
    modules[moduleDefinition.name].instance = require("mykoop-" + moduleDefinition.name);
  });
}

