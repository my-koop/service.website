export class RouteInformation {
  public fullPath: string;
  public relativePath: string;

  constructor(public name: string, path?: string) {
    if (path) {
      this.fullPath = "/" + path;
    } else {
      this.fullPath = "/" + this.name.replace(/\s+/g, '');
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
      path = name.replace(/\s+/g, '');;
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

// public pages
export var homepage = new RouteInformationTree("Homepage");
  export var aboutUs = new RouteInformationTree("About Us", homepage);
  export var pwdRcv = new RouteInformationTree("Password Recovery", homepage);
  export var myaccount = new RouteInformationTree("My Account", homepage);
    export var register = new RouteInformationTree("Register", myaccount);
    export var login = new RouteInformationTree("Login", myaccount);
  export var shop = new RouteInformationTree("Shop", homepage);
    export var cart = new RouteInformationTree("Cart", shop);

// dashboard pages
export var dashboard = new RouteInformationTree("Dashboard", homepage);
  export var options = new RouteInformationTree("Options", dashboard);
  export var stats = new RouteInformationTree("Stats", dashboard);
  export var transaction = new RouteInformationTree("Transactions", dashboard);
  export var events = new RouteInformationTree("Events", dashboard);
    export var eventsPos = new RouteInformationTree("Event Pos", events);
    export var eventsReport = new RouteInformationTree("Events Report", events);
    export var eventsSignup = new RouteInformationTree("Events Signup", events);
  export var items = new RouteInformationTree("Items", dashboard);
    export var itemsItemsBelowThreshold = new RouteInformationTree("Items Below Threshold", items);
    export var itemsNextOrder = new RouteInformationTree("Supplier Order", items);
  export var mailing = new RouteInformationTree("Mailing Lists", dashboard);
    export var mailingSend = new RouteInformationTree("Mailing Send", mailing);
    export var mailingSubscribe = new RouteInformationTree("Mailing Subscribe", mailing);
  export var members = new RouteInformationTree("Members", dashboard);
    export var membersPermissions = new RouteInformationTree("Members Permissions", members);
    export var volunteerAvailability = new RouteInformationTree("Volunteer Availability", members);
    export var volunteerSchedule = new RouteInformationTree("Volunteer Schedule", members);



homepage.fullPath = "/";
// All frontend pages
export var frontEndPages: Array<RouteInformationTree> = [];
homepage.addAll(frontEndPages);

// ajax routes
export var navBar = new RouteInformation("getNavBar");