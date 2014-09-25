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
  export var aboutUs = new RouteInformationTree("aboutUs", homepage);
  export var pwdRcv = new RouteInformationTree("passwordRecovery", homepage);
  export var myaccount = new RouteInformationTree("myaccount", homepage);
    export var register = new RouteInformationTree("register", myaccount);
    export var login = new RouteInformationTree("login", myaccount);
  export var shop = new RouteInformationTree("shop", homepage);
    export var cart = new RouteInformationTree("cart", shop);

// dashboard pages
export var dashboard = new RouteInformationTree("dashboard", homepage);
  export var options = new RouteInformationTree("options", dashboard);
  export var stats = new RouteInformationTree("stats", dashboard);
  export var transaction = new RouteInformationTree("transaction_crud", dashboard);
    export var transaction_list = new RouteInformationTree("transaction_list", transaction);
  export var events = new RouteInformationTree("events_crud", dashboard);
    export var events_list = new RouteInformationTree("events_list", events);
    export var events_pos = new RouteInformationTree("events_pos", events);
    export var events_report = new RouteInformationTree("events_report", events);
    export var events_signup = new RouteInformationTree("events_signup", events);
  export var items = new RouteInformationTree("items_crud", dashboard);
    export var items_list = new RouteInformationTree("items_list", items);
    export var items_itemsbelowthreshold = new RouteInformationTree("items_itemsbelowthreshold", items);
    export var items_nextorder = new RouteInformationTree("items_nextorder", items);
  export var mailing = new RouteInformationTree("mailing_crud", dashboard);
    export var mailing_mailinglists = new RouteInformationTree("mailing_lists", mailing);
    export var mailing_send = new RouteInformationTree("mailing_send", mailing);
    export var mailing_subscribe = new RouteInformationTree("mailing_subscribe", mailing);
  export var members = new RouteInformationTree("members_crud", dashboard);
    export var members_list = new RouteInformationTree("members_list", members);
    export var members_permissions = new RouteInformationTree("members_permissions", members);
    export var volunteer_availability = new RouteInformationTree("volunteer_availability", members);
    export var volunteer_schedule = new RouteInformationTree("volunteer_schedule", members);



homepage.fullPath = "/";
// All frontend pages
export var frontEndPages: Array<RouteInformationTree> = [];
homepage.addAll(frontEndPages);

// ajax routes
export var navBar = new RouteInformation("getNavBar");