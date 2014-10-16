// Type definitions for my-koop
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

declare module mykoop {

  export interface IModule {

  }

  export interface ModuleDefinition {
    name: string;
    role: string;
    dependencies?: string[];
  }

  export class ModuleManager {
    // Adds a core module to the manager
    setCore(moduleName: string, module: IModule): void;
    // Retrieves the instance of a module, can be null if unavailable
    get(moduleName: string): IModule;
    // Load all modules from the definition
    loadModules(moduleDefinitions_: ModuleDefinition[]): void;
    // Instanciate all modules from the definition
    initializeLoadedModules(): void;
  }

  export interface IModuleBridge {
    // All modules are initialized and are available to use
    onAllModulesInitialized(moduleManager: ModuleManager): void;

    // Retrieve the instance of the module, may not be ready to be used
    getModule(): IModule;

    getMetaData(): IModuleMetaData;
  }

  export interface IRouteMetaDataLeaf {
    handler?: string;
    name?: string;
    path?: string;
  }

  export interface IRouteMetaDataParent extends IRouteMetaDataLeaf {
    wrapper: IRouteMetaDataLeaf;
    default: IRouteMetaDataLeaf;
  }

  export interface IModuleMetaData {
    // Route meta data.
    routes?: {[key: string]: IRouteMetaDataLeaf};

    // Your mom meta data...

    // Other types of meta data...
    [key: string]: any;
  }
}

