// Type definitions for my-koop
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

declare module "mykoop" {

  export interface IModule {

  }

  export class ModuleManager {
    // Retrieves the instance of a module, can be null if unavailable
    get(moduleName: string): IModule;
  }

  export interface IModuleBridge {
    // All modules are loaded and are available to use
    onAllModulesLoaded: (moduleManager: ModuleManager) => void;

    // Retrieve the instance of the module, may not be ready to be used
    getModule(): IModule;

    // List of paths to style sheet (.less) to load with the module, can be null
    getStyles(): string[];

    // List of paths to react components (.jsx) to load with the module, can be null
    getReactComponents(): string[];
  }

}

