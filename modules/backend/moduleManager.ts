///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");

var MODULE_NAME_PREFIX = "mykoop-";

class CoreBridge implements mykoop.IModuleBridge {
  private instance: mykoop.IModule;
  constructor(instance: mykoop.IModule){
    this.instance = instance;
  }
  onAllModulesInitialized(moduleManager: mykoop.ModuleManager): void {}
  getModule(): mykoop.IModule { return this.instance; }
  getMetaData(callback: mykoop.ModuleMetaDataCallback): void {
    callback(null, {});
  }
}

class Module {
  public instance: mykoop.IModule;
  public bridge: mykoop.IModuleBridge;
  public dependants: { [id:string]:number };

  constructor(public moduleName: string, public isCore?: boolean) {
    this.instance = null;
    this.bridge = null;
    this.dependants = {};
  }
}

interface ModuleDictionary{
  [id: string]: Module;
}

class ModuleManager implements mykoop.ModuleManager {
  private modules: ModuleDictionary = {};
  private moduleDefinitions: mykoop.ModuleDefinition[] = [];
  private metaData: mykoop.IModuleMetaData;

  get(moduleName: string): mykoop.IModule {
    return (this.modules[moduleName] && this.modules[moduleName].instance) || null;
  }

  setCore(moduleName: string, coreModule: mykoop.IModule): void {
    var coreModuleProxy = new Module(moduleName, true);
    coreModuleProxy.bridge = new CoreBridge(coreModule);
    coreModuleProxy.instance = coreModule;

    // For core modules, the role is the same as the name.
    this.modules[moduleName] = coreModuleProxy;
  }

  loadModules(moduleDefinitions_: mykoop.ModuleDefinition[]) {
    var self = this;

    // Transform array into an object
    this.modules = moduleDefinitions_.reduce(function (modules: ModuleDictionary, moduleDefinition, index) {
      var name = moduleDefinition.name;
      var role = moduleDefinition.role;

      if (!name) {
        console.error("Every module needs to specify a name.");
        return modules;
      }

      if (!role) {
        console.error("Role not defined for module %s.", name);
        return modules;
      }

      // Allow replacement of core modules.
      if (modules[role] && !modules[role].isCore) {
        console.error(
          "Duplicate role: %s. (Defined by %s and attempted to be redefined by %s)",
          role,
          modules[role].moduleName,
          name
        );
        return modules;
      }

      // Only use valid definitions
      self.moduleDefinitions.push(moduleDefinition);
      modules[role] = new Module(name);

      return modules;
    }, this.modules);

    // Check for dependencies
    var allDependenciesSatisfied = true;
    var moduleDependenciesSatisfied = this.moduleDefinitions.map(
      function(moduleDefinition, index) {
        var dependenciesSatisfied = _.all(
          moduleDefinition.dependencies,
          function(dependency) {
            if(self.modules.hasOwnProperty(dependency)){
              self.modules[dependency].dependants[moduleDefinition.role] = index;
              return true;
            }
            return false;
          }
        );
        allDependenciesSatisfied = allDependenciesSatisfied && dependenciesSatisfied;
        return dependenciesSatisfied;
      }
    );

    //TODO: Be more verbose about what doesn't have valid dependencies.
    if (!allDependenciesSatisfied) {
      self.moduleDefinitions.forEach(function(moduleDefinition, index) {
        if(!moduleDependenciesSatisfied[index]){
          console.error("Error: Dependencies missing for module %s", moduleDefinition.name);
        }
      });
    }

    // Instanciate modules.
    self.moduleDefinitions.forEach(function(moduleDefinition, index) {
      if(moduleDependenciesSatisfied[index]){
        // sync call
        console.log("Loading module %s", moduleDefinition.name);
        var bridge;
        try{
          bridge = require(MODULE_NAME_PREFIX + moduleDefinition.name);
        } catch(e) {
          console.error(e);
          _.each(self.modules[moduleDefinition.role].dependants, function(index, moduleRole){
            moduleDependenciesSatisfied[index] = false;
            delete self.modules[moduleRole];
          });
          moduleDependenciesSatisfied[index] = false;
          delete self.modules[moduleDefinition.role];
          return;
        }
        self.modules[moduleDefinition.role].bridge = bridge;
      } else {
        delete self.modules[moduleDefinition.role];
      }
    });

    // Use definition again to respect order
    self.moduleDefinitions = self.moduleDefinitions.filter(
      function(moduleDefinition, index) {
        return moduleDependenciesSatisfied[index];
      }
    );
  }

  getLoadedModulePairings(): {[role: string]: string} {
    return this.moduleDefinitions.reduce(
      function (
        pairings: {[role: string]: string},
        moduleDefinition
      ) {
        pairings[moduleDefinition.role] = MODULE_NAME_PREFIX + moduleDefinition.name;
        return pairings;
      },
      <{[role: string]: string}>{}
    );
  }

  getMetaData(callback: mykoop.ModuleMetaDataCallback) : void {
    var self = this;

    function computeResolveDemands(
      moduleName: string,
      metaData: /*FIXME: mykoop.IRouteMetaDataLeaf*/ any
    ): mykoop.IModuleMetaData {
      if (_.isPlainObject(metaData)) {
        if (
          metaData.hasOwnProperty("resolve") &&
          metaData.hasOwnProperty("value") &&
          Object.keys(metaData).length === 2
        ) {
          // Consider this a leaf that needs to be resolved.
          var computedMetaData;

          switch (metaData.resolve) {
            case "component":
              computedMetaData = {
                origin: MODULE_NAME_PREFIX + moduleName + "/components"
              };
              if (metaData.value) {
                computedMetaData.property = metaData.value;
              }
              return computedMetaData;

            default:
              // Your princess is in another castle...
              return metaData;
          }
        }

        _.forEach(metaData, function (value, key) {
          metaData[key] = computeResolveDemands(moduleName, value);
        });
      }

      return metaData;
    }

    if (this.metaData) {
      return callback(null, this.metaData);
    }

    //FIXME: Temporarily here for lack of a better choice. Ultimately this
    // will be an empty object literal.
    this.metaData = {
      routes: {
        public: {
          handler: {origin: "components/PublicWrapper"},
          name: "Homepage",
          path: "/",
          children: {
            homepage: {
              default: true,
              handler: {origin: "components/Homepage"}
            },
            aboutUs: {
              handler: {origin: "components/PlaceHolder"},
              name: "About Us",
              path: "/aboutus"
            },
            myAccount: {
              handler: {origin: "components/MyAccountPage"},
              name: "My Account",
              path: "/myaccount"
            },
            shop: {
              handler: {origin: "components/ParentPlaceHolder"},
              name: "Shop",
              path: "/shop",
              children: {
                storefront: {
                  default: true,
                  handler: {origin: "components/PlaceHolder"}
                },
                cart: {
                  handler: {origin: "components/PlaceHolder"},
                  name: "Shopping Cart",
                  path: "/shop/cart"
                }
              }
            }
          }
        }
      },
      translations: {
        en: {
          general: {
            "testString": "blablabla"
          }
        }
      }
    };

    this.moduleDefinitions.forEach(function(moduleDefinition) {
      var getMetaData = self.modules[moduleDefinition.role].bridge.getMetaData;
      if (_.isFunction(getMetaData)) {
        getMetaData(function(err, result) {
          var metaData = computeResolveDemands(moduleDefinition.name, result);
          self.metaData = <mykoop.IModuleMetaData>_.merge(
            self.metaData,
            metaData
          );
        });
      }
    });

    callback(null, this.metaData);
  }

  initializeLoadedModules() : void {
    var self = this;

    _.forEach(this.modules, function(currentModule) {
      currentModule.instance = currentModule.bridge.getModule();
    });

    // Use definition again to respect order
    this.moduleDefinitions.forEach(function(moduleDefinition) {
      self.modules[moduleDefinition.role].bridge.onAllModulesInitialized(self);
    });
  }
}

var moduleManager: mykoop.ModuleManager = new ModuleManager();
export = moduleManager;

