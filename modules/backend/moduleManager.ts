///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");

class CoreBridge implements mykoop.IModuleBridge {
  private instance: mykoop.IModule;
  constructor(instance: mykoop.IModule){
    this.instance = instance;
  }
  onAllModulesLoaded(moduleManager: mykoop.ModuleManager): void {}
  getModule(): mykoop.IModule { return this.instance; }
  getStyles(): string[] { return null; }
  getReactComponents(): string[] { return null; }
}

class Module {
  public instance: mykoop.IModule;
  public bridge: mykoop.IModuleBridge;
  public dependants: { [id:string]:number };

  constructor(public isCore?: boolean) {
    this.instance = null;
    this.bridge = null;
    this.dependants = {};
  }
}

interface ModuleDictionary{
  [id: string]: Module;
}

class ModuleManager implements mykoop.ModuleManager {
  modules: ModuleDictionary = {};

  get(moduleName: string): mykoop.IModule {
    return (this.modules[moduleName] && this.modules[moduleName].instance) || null;
  }

  setCore(moduleName: string, coreModule: mykoop.IModule): void {
    var coreModuleProxy = new Module(true);
    coreModuleProxy.bridge = new CoreBridge(coreModule);
    coreModuleProxy.instance = coreModule;

    this.modules[moduleName] = coreModuleProxy;
  }

  getGlobalModuleStylePaths(): string[] {
    return [];
  }

  getModuleComponentPaths(): string[] {
    return [];
  }

  initializeModules(moduleDefinitions_: mykoop.ModuleDefinition[]) {
    var self = this;

    var moduleDefinitions: mykoop.ModuleDefinition[] = [];
    // Transform array into an object
    this.modules = moduleDefinitions_.reduce(function (modules: ModuleDictionary, moduleDefinition, index) {
      var name = moduleDefinition.name;

      // Allow replacement of core modules
      if (modules[name] && !modules[name].isCore) {
        console.error("Duplicate module: %s.", name);
        return modules;
      }

      // Only use valid definitions
      moduleDefinitions.push(moduleDefinition);
      modules[name] = new Module();

      return modules;
    }, this.modules );

    // Check for dependencies
    var allDependenciesSatisfied = true;
    var moduleDependenciesSatisfied = moduleDefinitions.map(function(moduleDefinition, index) {
      var dependenciesSatisfied = _.all(
        moduleDefinition.dependencies,
        function(dependency) {
          if(self.modules.hasOwnProperty(dependency)){
            self.modules[dependency].dependants[moduleDefinition.name] = index;
            return true;
          }
          return false;
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
        console.log("Loading module %s", moduleDefinition.name);
        var bridge;
        try{
          bridge = require("mykoop-" + moduleDefinition.name);
        } catch(e) {
          console.error(e);
          _.each(self.modules[moduleDefinition.name].dependants, function(index, moduleName){
            moduleDependenciesSatisfied[index] = false;
            delete self.modules[moduleName];
          });
          moduleDependenciesSatisfied[index] = false;
          delete self.modules[moduleDefinition.name];
          return;
        }
        self.modules[moduleDefinition.name].bridge = bridge;
        self.modules[moduleDefinition.name].instance = bridge.getModule();
      } else {
        delete self.modules[moduleDefinition.name];
      }
    });

    // Use definition again to respect order
    moduleDefinitions.forEach(function(moduleDefinition, index) {
      if(moduleDependenciesSatisfied[index]){
        self.modules[moduleDefinition.name].bridge.onAllModulesLoaded(self);
      }
    });
  }
}

var moduleManager: mykoop.ModuleManager = new ModuleManager();
export = moduleManager;

