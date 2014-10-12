///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");
import mykoop = require("mykoop");

export interface ModuleDefinition {
  name: string;
  dependencies?: string[];
}

export class Module {
  public instance: mykoop.IModule;
  public bridge: mykoop.IModuleBridge;
  constructor() {
    this.instance = null;
    this.bridge = null;
  }
}

export interface ModuleDictionary{
  [id: string]: Module;
}

export class ModuleManager implements mykoop.ModuleManager {
  get(moduleName: string): mykoop.IModule {
    return (this.modules[moduleName] && this.modules[moduleName].instance) || null;
  }
  modules: ModuleDictionary;

  initializeModules(moduleDefinitions: ModuleDefinition[]) {
    this.modules = <ModuleDictionary>moduleDefinitions.reduce(function (modules, moduleDefinition, index) {
      var name = moduleDefinition.name;

      if (modules[name]) {
        console.error("Duplicate module: %s.", name);
        return modules;
      }

      modules[name] = new Module();

      return modules;
    }, {});

    var allDependenciesSatisfied = true;
    var moduleDependenciesSatisfied = moduleDefinitions.map(function(moduleDefinition, index) {
      var dependenciesSatisfied = _.all(
        moduleDefinition.dependencies,
        function(dependency) {
          return this.modules.hasOwnProperty(dependency);
        }
      );
      allDependenciesSatisfied = allDependenciesSatisfied && dependenciesSatisfied;
      return dependenciesSatisfied;
    });

    //TODO: Be more verbose about what doesn't have valid dependencies.
    if (!allDependenciesSatisfied) {
      moduleDefinitions.forEach(function(moduleDefinition, index) {
        if(!moduleDependenciesSatisfied[index]){
          console.error("Error: Dependencies missing for module %s", moduleDefinition.name);
        }
      });
    }

    // Instanciate modules.
    moduleDefinitions.forEach(function(moduleDefinition, index) {
      if(moduleDependenciesSatisfied[index]){
        // sync call
        var bridge = require("mykoop-" + moduleDefinition.name);
        this.modules[moduleDefinition.name].bridge = bridge;
        this.modules[moduleDefinition.name].instance = bridge.getModule();
      } else {
        delete this.modules[moduleDefinition.name];
      }
    });

    // Use definition again to respect order
    moduleDefinitions.forEach(function(moduleDefinition, index) {
      if(moduleDependenciesSatisfied[index]){
        this.modules[moduleDefinition.name].bridge.onAllModulesLoaded(this);
      }
    });

  }
}

