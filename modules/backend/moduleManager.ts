///<reference path="../../typings/tsd.d.ts" />
import _ = require("lodash");
import utils = require("mykoop-utils");
import getLogger = require("mykoop-logger");
var managerLogger = getLogger(module);

var MODULE_NAME_PREFIX = "mykoop-";

class CoreBridge implements mykoop.IModuleBridge {
  private instance: mykoop.IModule;
  constructor(instance: mykoop.IModule) {
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
  public logger: mklogger.Logger;
  public name: string;
  public role: string;

  constructor(name: string, role: string, public isCore?: boolean) {
    this.name = name;
    this.role = role;
    this.logger = getLogger(role);

    this.instance = null;
    this.bridge = null;
    this.dependants = {};
  }
}

interface ModuleDictionary{
  [id: string]: Module;
}

interface Pairing {
  [id: string]: string;
}

class ModuleManager implements mykoop.ModuleManager {
  private modules: ModuleDictionary = {};
  private moduleDefinitions: mykoop.ModuleDefinition[] = [];
  private metaData: any;

  get(moduleName: string): mykoop.IModule {
    return (this.modules[moduleName] && this.modules[moduleName].instance) || null;
  }

  setCore(moduleName: string, coreModule: mykoop.IModule): void {
    var coreModuleProxy = new Module(moduleName, moduleName, true);
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
        managerLogger.error(
          "Every module needs to specify a name. %j",
          moduleDefinition
        );
        return modules;
      }

      if (!role) {
        managerLogger.error(
          "Role not defined for module %s.",
          name,
          {culprit: moduleDefinition}
        );
        return modules;
      }

      // Allow replacement of core modules.
      if (modules[role] && !modules[role].isCore) {
        managerLogger.error(
          "Duplicate role: %s. (Defined by %s and attempted to be redefined by %s)",
          role,
          modules[role].name,
          name
        );
        return modules;
      }

      // Only use valid definitions
      self.moduleDefinitions.push(moduleDefinition);
      modules[role] = new Module(name, role);

      return modules;
    }, this.modules);

    // Check for dependencies
    var allDependenciesSatisfied = true;
    var moduleDependenciesSatisfied = this.moduleDefinitions.map(
      function (moduleDefinition, index) {
        var dependenciesSatisfied = _.all(
          moduleDefinition.dependencies,
          function (dependency) {
            if (self.modules.hasOwnProperty(dependency)) {
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
      self.moduleDefinitions.forEach(function (moduleDefinition, index) {
        if (!moduleDependenciesSatisfied[index]) {
          managerLogger.error(
            "Error: Dependencies missing for module %s",
            moduleDefinition.name
          );
        }
      });
    }

    // Instanciate modules.
    self.moduleDefinitions.forEach(function (moduleDefinition, index) {
      if (moduleDependenciesSatisfied[index]) {
        var module = self.modules[moduleDefinition.role];
        module.logger.verbose("Loading module...");
        var bridge: mykoop.IModuleBridge;
        // Try to load module
        try {
          bridge = require(MODULE_NAME_PREFIX + moduleDefinition.name);
          var validate: mykoop.IModuleBridge = {
            getModule: bridge.getModule.bind(null),
            onAllModulesInitialized: bridge.onAllModulesInitialized.bind(null)
          };
        } catch(e) {
          // Couldn't load the module
          module.logger.error(e, {});
          // Mark all module depending on this one as invalid
          _.each(module.dependants, function (index, moduleRole) {
            moduleDependenciesSatisfied[index] = false;
            self.modules[moduleRole].logger.error(
              "Dependency %s had errors",
              moduleDefinition.name
            );
            delete self.modules[moduleRole];
          });
          // Mark this module invalid
          moduleDependenciesSatisfied[index] = false;
          delete self.modules[moduleDefinition.role];
          return;
        }
        // Everything is fine
        module.bridge = bridge;
      } else {
        // Already marked as invalid, remove it
        self.modules[moduleDefinition.role].logger.error("Dependencies had errors");
        delete self.modules[moduleDefinition.role];
      }
    });

    // Use definition again to respect order
    self.moduleDefinitions = self.moduleDefinitions.filter(
      function (moduleDefinition, index) {
        return moduleDependenciesSatisfied[index];
      }
    );
  }

  getLoadedModulePairings(): {[role: string]: string} {
    return this.moduleDefinitions.reduce(
      function (
        pairings: Pairing,
        moduleDefinition
      ) {
        pairings[moduleDefinition.role] = MODULE_NAME_PREFIX + moduleDefinition.name;
        return pairings;
      },
      <Pairing>{}
    );
  }

  getMetaData(callback: mykoop.ModuleMetaDataCallback) : void {
    var self = this;

    function computeResolveDemands(
      moduleName: string,
      metaData: any
    ): mykoop.IModuleMetaData {
      if (_.isPlainObject(metaData)) {
        if (
          metaData.hasOwnProperty("resolve")
        ) {
          // Consider this a leaf that needs to be resolved.
          var computedMetaData;

          switch (metaData.resolve) {
            case "component":
              computedMetaData = {
                origin: MODULE_NAME_PREFIX + moduleName + "/components"
              };
              if (metaData.value) {
                computedMetaData.origin += "/" + metaData.value;
              }
              return computedMetaData;
            case "validation":
              computedMetaData = {
                origin: MODULE_NAME_PREFIX + moduleName + "/lib/validation"
              };
              if (metaData.value) {
                computedMetaData.property = metaData.value;
              }
              return computedMetaData;
            default:
              // Your princess is in another castle...
              managerLogger.warn(
                "Unrecognized resolve type: \"%s\" in module %s.",
                metaData.resolve,
                moduleName
              );
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

    this.metaData = {};

    this.moduleDefinitions.forEach(function (moduleDefinition) {
      var module = self.modules[moduleDefinition.role];
      var getMetaData = module.bridge.getMetaData;
      if (_.isFunction(getMetaData)) {
        module.logger.verbose("Acquiring MetaData...");
        getMetaData(function (err, result) {
          module.logger.debug("Computing resolve...");
          var metaData = computeResolveDemands(moduleDefinition.name, result);
          self.mergeMetaData(metaData, moduleDefinition);
        });
      }
    });

    callback(null, this.metaData);
  }

  mergeMetaData(metaData: any, moduleDefinition: mykoop.ModuleDefinition) {
    if (_.isEmpty(metaData)) {
      return;
    }

    if (utils.__DEV__) {
      // must deep clone because _.merge() changes var on the left
      var srcMetaData = _.cloneDeep(this.metaData);
    }

    var newMetaData = <mykoop.IModuleMetaData>_.merge(
      this.metaData,
      metaData
    );

    if (utils.__DEV__) {
      var moduleLogger = getLogger(moduleDefinition.role);
      moduleLogger.debug("Checking metadata merge...");

      function checkIfOverwritten(path, src, res) {
        if (typeof src !== typeof res) {
          moduleLogger.warn([
            "The metadata has changed type [%s -> %s] at path [%s]",
            typeof src,
            typeof res,
            path
          ]);
        } else if (_.isArray(src)) {
          var sl = src.length, rl = res.length;
          for (var i = 0; i < sl; ++i) {
            checkIfOverwritten(path + "/[" + i + "]", src[i], res[i]);
          }
        } else if (_.isObject(src)) {
          _.forEach(Object.keys(src), function (key) {
            checkIfOverwritten(path + "/" + key, src[key], res[key]);
          });
        } else {
          if (src !== res) {
            moduleLogger.warn([
              "The value changed [%s -> %s] at path [%s]",
              _(src).toString(),
              _(res).toString(),
              path
            ]);
          }
        }
      }

      checkIfOverwritten("", srcMetaData, newMetaData);
    }

    this.metaData = newMetaData;
  }

  initializeLoadedModules() : void {
    var self = this;

    _.forEach(this.modules, function (currentModule) {
      currentModule.instance = currentModule.bridge.getModule();
      // check for backward compatibility
      if (currentModule.instance.setModuleManager) {
        currentModule.instance.setModuleManager(self);
      }
    });

    // Use definition again to respect order
    this.moduleDefinitions.forEach(function (moduleDefinition) {
      var module = self.modules[moduleDefinition.role];
      module.logger.verbose("Initialising module...");
      module.bridge.onAllModulesInitialized(self);
    });
  }
}

var moduleManager: mykoop.ModuleManager = new ModuleManager();
export = moduleManager;

