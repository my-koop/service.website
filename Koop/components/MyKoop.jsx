var React = require("react");
var ReactRouter = require("react-router");

var DefaultRoute = ReactRouter.DefaultRoute;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var RouteInfo = require("routeInformation");

var MKApp = require("components/App");
var MKHomepage = require("components/Homepage");
var MKUsers = require("components/Users");

var MyKoop = React.createClass({
  render: function() {
    return (
      <Routes location="history">
        <Route name={RouteInfo.homepage.name} path={RouteInfo.homepage.fullPath} handler={MKApp}>
          <Route name={RouteInfo.users.name} path={RouteInfo.users.relativePath} handler={MKUsers}/>
          <DefaultRoute handler={MKHomepage}/>
        </Route>
        <Route name={RouteInfo.dashboard.name} path={RouteInfo.dashboard.fullPath} handler={MKApp}>
          <Route name={RouteInfo.profile.name} path={RouteInfo.profile.relativePath} handler={MKUsers}/>
          <DefaultRoute handler={MKHomepage}/>
        </Route>
      </Routes>
    );
  }
});

module.exports = MyKoop;
