// Type definitions for my-koop
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

declare module express {
  export interface Router{}
}

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
    // Get the meta data computed from loaded modules.
    getMetaData(callback: ModuleMetaDataCallback): void;
  }

  export interface IModuleBridge {
    // All modules are initialized and are available to use
    onAllModulesInitialized(moduleManager: ModuleManager): void;

    // Retrieve the instance of the module, may not be ready to be used
    getModule(): IModule;

    getMetaData?: (callback: ModuleMetaDataCallback) => void;
  }

  export interface ModuleMetaDataCallback {
    (err: Error, result: any) : void;
  }

  export interface IRouteMetaDataLeaf {
    handler?: {resolve: string; value?: string};
    name?: string;
    path?: string;
    default?: boolean;
  }

  export interface IRouteMetaDataParent extends IRouteMetaDataLeaf {
    children: {[id: string]: IRouteMetaDataLeaf};
  }

  export interface IModuleMetaData {
    // Route meta data.
    routes?: {[key: string]: IRouteMetaDataLeaf};
    translations?: {[key: string]: any};

    // Other types of meta data...
    [key: string]: any;
  }

  // see http://expressjs.com/4x/api.html#router
  export interface RouterOptions{
    caseSensitive?: boolean;
    mergeParams?: boolean;
    strict?: boolean;
  }

  export class Router implements IModule {
    addRoutes(callback: (router: express.Router) => string, options?: RouterOptions);
  }
}

