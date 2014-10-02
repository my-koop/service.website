var React = require("react");
var Router = require("react-router");
var RouteInfo = require("routeInformation");

var BSCol = require("react-bootstrap/Col");

var PropTypes = React.PropTypes;

var SideBar = React.createClass({
  propTypes: {
  },

  render : function() {
    return (
      <BSCol md={2}>
        Hello.
      </BSCol>
    );
  }
});

module.exports = SideBar;
