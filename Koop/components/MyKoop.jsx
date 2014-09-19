var React = require("react");
var ReactRouter = require("react-router");

var DefaultRoute = ReactRouter.DefaultRoute;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;

var MKApp = require("components/App");
var MKHomepage = require("components/Homepage");
var MKUsers = require("components/Users");

var MyKoop = React.createClass({
  render: function() {
    return (
      <Routes location="history">
        <Route name="app" path="/" handler={MKApp}>
          <Route name="users" handler={MKUsers}/>
          <DefaultRoute handler={MKHomepage}/>
        </Route>
      </Routes>
    );
  }
});

module.exports = MyKoop;
