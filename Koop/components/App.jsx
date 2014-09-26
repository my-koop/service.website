var React = require("react");

var MKDevNavBar = require("components/DevNavBar");
var BSGrid = require("react-bootstrap/Grid");
var BSRow = require("react-bootstrap/Row");


var App = React.createClass({

  render: function() {
    return (
      <BSGrid fluid>
        <BSRow>
          <MKDevNavBar hide/>
        </BSRow>
        <BSRow style={{border:"1px solid black"}}>
            {this.props.activeRouteHandler()}
        </BSRow>
      </BSGrid>
    );
  }
});

module.exports = App;
