export class RouteInformation {
  public fullPath: string;
  public relativePath: string;

  constructor(public name: string, path?: string) {
    if (path) {
      this.fullPath = "/" + path;
    } else {
      this.fullPath = "/" + this.name;
    }
    this.relativePath = this.fullPath;
  }
}

export class RouteInformationTree {
  public childs: Array<RouteInformationTree>;
  public relativePath: string;
  public fullPath: string;

  constructor(public name: string, parent?: RouteInformationTree, path?: string) {

    // relative path is full path before fixup with parent
    if (path === undefined){
      path = name;
    }
    this.relativePath = path;

    // fixup fullpath from parent
    if (parent) {
      parent.childs.push(this);
      this.fullPath = parent.fullPath + "/" + path;
    } else {
      this.fullPath = "";
    }

    // initialise empty childs
    this.childs = [];
  }

  // Add this and all children to the array
  addAll(arr: Array<RouteInformationTree>) {
    arr.push(this);
    for (var i = 0; i < this.childs.length; ++i) {
      this.childs[i].addAll(arr);
    }
  }
}

// static pages
export var homepage = new RouteInformationTree("homepage");
export var users = new RouteInformationTree("users", homepage);
export var aboutUs = new RouteInformationTree("aboutUs", homepage);

// dashboard pages
export var dashboard = new RouteInformationTree("dashboard", homepage);
export var profile = new RouteInformationTree("profile", dashboard);

homepage.fullPath = "/";
// All frontend pages
export var frontEndPages: Array<RouteInformationTree> = [];
homepage.addAll(frontEndPages);

// ajax routes
export var navBar = new RouteInformation("getNavBar");