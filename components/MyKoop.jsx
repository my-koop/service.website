var _ = require("lodash");

var React = require("react");
var ReactRouter = require("react-router");

var DefaultRoute = ReactRouter.DefaultRoute;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;

var routeData = require("dynamic-metadata").routes;

var MKApp = require("mykoop-core/components/wrappers/AppWrapper");


function addDynamicRoute(routeInfo) {
  var children = null;
  if (routeInfo.hasOwnProperty("children")) {
    children = [];
    _.forEach(routeInfo.children, function (child) {
      if (child.hasOwnProperty("default")) {
        children.push(
          <DefaultRoute key={child.path} handler={child.handler()} />
        );
      } else {
        children.push(addDynamicRoute(child));
      }
    });
  }

  if (!routeInfo.hasOwnProperty("handler")) {
    return children;
  }

  return (
    <Route
      key={routeInfo.path}
      name={routeInfo.name}
      path={routeInfo.path}
      handler={routeInfo.handler()}
    >
      {children}
    </Route>
  );
}

var dynamicRoutes = addDynamicRoute({children: routeData});

/*
dynamicRoutes.push([
<Route name={RouteInfo.dashboard.name} path={RouteInfo.dashboard.fullPath} handler={MKDashboardWrapper}>
  <Route name={RouteInfo.options.name} path={RouteInfo.options.relativePath} handler={MKOptionsPage}/>
  <Route name={RouteInfo.transaction.name} path={RouteInfo.transaction.relativePath} handler={MKTransactionList}/>
  <Route name={RouteInfo.events.name} path={RouteInfo.events.relativePath} handler={MKParentPlaceHolder}>
    <DefaultRoute displayName={RouteInfo.events.name} handler={MKEventsList}/>
  </Route>
  <Route name={RouteInfo.items.name} path={RouteInfo.items.relativePath} handler={MKParentPlaceHolder}>
    <Route name={RouteInfo.itemsItemsBelowThreshold.name} path={RouteInfo.itemsItemsBelowThreshold.relativePath} handler={MKItemsBelowThreshold}/>
  </Route>
  <Route name={RouteInfo.mailing.name} path={RouteInfo.mailing.relativePath} handler={MKParentPlaceHolder}>
    <Route name={RouteInfo.mailingSend.name} path={RouteInfo.mailingSend.relativePath} handler={MKMailingListSendPage}/>
  </Route>
  <Route name={RouteInfo.members.name} path={RouteInfo.members.relativePath} handler={MKParentPlaceHolder}>
    <Route name={RouteInfo.membersPermissions.name} path={RouteInfo.membersPermissions.relativePath} handler={MKUserPrivilegesPage}/>
    <Route name={RouteInfo.volunteerAvailability.name} path={RouteInfo.volunteerAvailability.relativePath} handler={MKVolunteerAvailability}/>
  </Route>
</Route>
]);
*/

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
