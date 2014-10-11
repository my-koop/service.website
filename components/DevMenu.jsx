var React = require("react");

var BSDropdownButton = require("react-bootstrap/DropdownButton");
var BSMenuItem = require("react-bootstrap/MenuItem");
var BSNav = require("react-bootstrap/Nav");

var MKIcon = require("components/Icon");

var PropTypes = React.PropTypes;

var DevMenu = React.createClass({
  render : function() {
    return (
      <BSNav className="navbar-right">
        <BSDropdownButton
          title={<span><MKIcon glyph="cog" /> DEBUG</span>}
        >
          <BSMenuItem>
            Coming soon...
          </BSMenuItem>
        </BSDropdownButton>
      </BSNav>
    );
  }
});

module.exports = DevMenu;
