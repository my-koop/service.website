var React = require("react");
var BSPanel = require("react-bootstrap/Panel");
var MKLoginBox = require("components/LoginBox");

var LoginPage = React.createClass({

  render: function() {
    return (
      <BSPanel header="Please Sign In">
        <MKLoginBox />
      </BSPanel>
    );
  }
});

module.exports = LoginPage;
