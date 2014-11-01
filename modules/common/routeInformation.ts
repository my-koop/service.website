export class RouteInformation {
  public fullPath: string;
  public relativePath: string;

  constructor(public name: string, path?: string) {
    if (path) {
      this.fullPath = "/" + path;
    } else {
      this.fullPath = "/" + this.name.replace(/\s+/g, "");
    }
    this.relativePath = this.fullPath;
  }
}

// ajax routes
export var devNavBar = new RouteInformation("getDevNavBar");
export var itemsBelowThreshold = new RouteInformation("Get Items Below Threshold", "getItemsBelowThreshold");
export var itemsData = new RouteInformation("Items Ajax", "ItemsAjax");
