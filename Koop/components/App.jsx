var React = require("react");

var MKNavigationBar = require("components/NavigationBar");
var BSGrid = require("react-bootstrap/Grid");
var BSRow = require("react-bootstrap/Row");

var App = React.createClass({
  render: function() {
    return (
      <BSGrid fluid={true}>
        <BSRow><MKNavigationBar /></BSRow>
        <BSRow>{this.props.activeRouteHandler()}</BSRow>
      </BSGrid>
    );
  }
});

module.exports = App;
