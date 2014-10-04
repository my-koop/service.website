var React = require("react");

var BSRow = require("react-bootstrap/Row");

var MKDevNavBar = require("components/DevNavBar");

var App = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.activeRouteHandler()}

        {/* To be removed after development. */}
        <BSRow>
          <MKDevNavBar hide />
        </BSRow>
      </div>
    );
  }
});

module.exports = App;
