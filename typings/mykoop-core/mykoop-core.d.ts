// Type definitions for mykoop-core
// Project: https://github.com/my-koop/service.website
// Definitions by: Michael Ferris <https://github.com/Cellule/>
// Definitions: https://github.com/my-koop/type.definitions

declare module express {
  export interface Router{}
}

declare module mykoop {
  export interface IModule {}

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

