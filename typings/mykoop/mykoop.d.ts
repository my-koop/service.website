// Type definitions for my-koop
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

declare module "mykoop" {

  export interface IModule {

  }

  export interface ModuleManager {
    get(moduleName: string): IModule;
  }

  export interface IModuleBridge {
    onAllModulesLoaded: (moduleManager: ModuleManager) => void;
    getModule(): IModule;
  }

}

