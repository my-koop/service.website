var _ = require("lodash");
var __ = require("language").__;

var React = require("react");
var ReactRouter = require("react-router");
var DefaultRoute = ReactRouter.DefaultRoute;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var DocumentTitle = require("react-document-title");
var routeData = require("dynamic-metadata").routes;

var MKApp                = require(
  "mykoop-core/components/wrappers/AppWrapper"
);
var MKPlaceHolder        = require("mykoop-core/components/PlaceHolder");
var MKPlaceHolderWrapper = require("mykoop-core/components/wrappers/PlaceHolderWrapper");

// FIXME: Allow modules to hook here so website doesn't have to know about
// the user module.
var MKPermissionMixin = require("mykoop-user/components/PermissionMixin");
var MKPermissionRedirectMixin = require(
  "mykoop-user/components/PermissionRedirectMixin"
);

var AuthenticationWrapper = React.createClass({
  mixins: [MKPermissionMixin, MKPermissionRedirectMixin],

  render: function() {
    var props = _.omit(this.props, ["subHandler", "ref"]);

    if (!this.state.userMeetsPermissions) {
      return null;
    }
    var extraTitle = __(
      this.props.i18nKey ||
      this.props.title ||
      this.props.name
    );

    extraTitle = extraTitle ? " - " + extraTitle : "";
    return (
      <DocumentTitle title={"My Koop" + extraTitle}>
        <this.props.subHandler
          {...props}
        />
      </DocumentTitle>
    );
  }
});

var DocumentWrapper = React.createClass({
  render: function() {
    var props = _.omit(this.props, ["subHandler", "ref"]);
    var extraTitle = __(
      this.props.i18nKey ||
      this.props.title ||
      this.props.name
    );
    extraTitle = extraTitle ? " - " + extraTitle : "";
    return (
      <DocumentTitle title={"My Koop" + extraTitle}>
        <this.props.subHandler
          {...props}
        />
      </DocumentTitle>
    );
  }
});

var iRoute = 0;
function addDynamicRoute(routeInfo) {
  var children = null;
  if (routeInfo.hasOwnProperty("children")) {
    children = [];
    _.forEach(routeInfo.children, function (child) {
      if (child.hasOwnProperty("default")) {
        children.push(
          <DefaultRoute key={iRoute++} handler={child.handler()} />
        );
      } else {
        children.push(addDynamicRoute(child));
      }
    });
  }

  var handler = null;
  if (routeInfo.hasOwnProperty("handler")) {
    handler = routeInfo.handler();
  } else {
    handler = children ? MKPlaceHolderWrapper : MKPlaceHolder;
  }

  var needsPermissionCheck = routeInfo.permissions &&
                             !routeInfo.manualPermissions;
  var props = _.omit(routeInfo,
    "handler",
    "children"
  );
  return (
    <Route
      key={iRoute++}
      {...props}
      handler={needsPermissionCheck ?
        AuthenticationWrapper :
        DocumentWrapper
      }
      subHandler={handler}
    >
      {children}
    </Route>
  );
}

var dynamicRoutes = addDynamicRoute({children: routeData});

var MyKoop = React.createClass({
  render: function() {
    return (
      <Routes location="history">
        <Route name="app" handler={MKApp}>
          {dynamicRoutes}
        </Route>
      </Routes>
    );
  }
});

module.exports = MyKoop;
