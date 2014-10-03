var React = require("react");
var Router = require("react-router");
var RouteInfo = require("routeInformation");

var BSCol = require("react-bootstrap/Col");
var BSListGroup = require("react-bootstrap/ListGroup");
var BSListGroupItem = require("react-bootstrap/ListGroupItem");

var PropTypes = React.PropTypes;

var SideBar = React.createClass({
  render : function() {
    return (
      <div className="sidebar">
        <BSListGroup>
          <BSListGroupItem href="#" active>Link 1</BSListGroupItem>
          <BSListGroupItem href="#">Link 2</BSListGroupItem>
          <BSListGroupItem href="#" disabled>Link 3</BSListGroupItem>
        </BSListGroup>
      </div>
    );
  }
});

module.exports = SideBar;
