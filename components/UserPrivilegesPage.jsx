var React = require("react");
var BSPanel = require("react-bootstrap/Panel");
var MKUserPrivilegesBox = require("components/UserPrivilegesBox");

var UserPrivilegesPage = React.createClass({

  render: function() {
    return (
      <BSPanel header="Assign Privileges">
        <MKUserPrivilegesBox />
      </BSPanel>
    );
  }
});

module.exports = UserPrivilegesPage;
