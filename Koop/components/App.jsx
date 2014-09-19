var React = require("react");

var MKNavigationBar = require("components/NavigationBar");

var App = React.createClass({
  render: function() {
    return (
      <div>
        <div><MKNavigationBar /></div>
        <div>{this.props.activeRouteHandler()}</div>
      </div>
    );
  }
});

module.exports = App;
