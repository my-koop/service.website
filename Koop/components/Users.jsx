var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");
var RouteInfo = require("routeInformation");

var Users = React.createClass({
  render: function() {
    return (
      <BSCol md={12}>
        USERS!!! <Link to={RouteInfo.homepage.name}>Go to homepage.</Link>
      </BSCol>
    );
  }
});

module.exports = Users;
