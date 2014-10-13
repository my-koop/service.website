// Type definitions for my-koop
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

declare module mykoop {

  export interface IModule {

  }

  export interface ModuleDefinition {
    name: string;
    dependencies?: string[];
  }

  export class ModuleManager {
    // Adds a core module to the manager
    setCore(moduleName: string, module: IModule): void;
    // Retrieves the instance of a module, can be null if unavailable
    get(moduleName: string): IModule;
    // Load all modules from the definition
    initializeModules(moduleDefinitions_: ModuleDefinition[]): void;
  }

  export interface IModuleBridge {
    // All modules are loaded and are available to use
    onAllModulesLoaded(moduleManager: ModuleManager): void;

    // Retrieve the instance of the module, may not be ready to be used
    getModule(): IModule;

    // List of paths to style sheet (.less) to load with the module, can be null
    getStyles(): string[];

    // List of paths to react components (.jsx) to load with the module, can be null
    getReactComponents(): string[];
  }

}

