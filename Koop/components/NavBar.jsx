var React = require("react");
var Router = require("react-router");
var RouteInfo = require("routeInformation");

var BSDropdownButton = require("react-bootstrap/DropdownButton");
var BSMenuItem = require("react-bootstrap/MenuItem");
var BSNavbar = require("react-bootstrap/Navbar");
var BSNav = require("react-bootstrap/Nav");

var MKIcon = require("components/Icon");
var MKNavItemLink = require("components/NavItemLink");

var PropTypes = React.PropTypes;


// NavigationBar
var NavigationBar = React.createClass({
  propTypes: {
  },

  getInitialState: function () {
    return {

    };
  },

  render : function() {
    return (
      <BSNavbar toggleNavKey={1}>
        <BSNav key={1} className="navbar-left">
          <MKNavItemLink to={RouteInfo.homepage.name}>
            <MKIcon glyph="home" /> Home
          </MKNavItemLink>
        </BSNav>
        <BSNav key={2} className="navbar-right">
          <BSDropdownButton
            key={3}
            title={<span><MKIcon glyph="user" /> sexytricycle</span>}
          >
            <BSMenuItem
              key="1"
              onSelect={Router.transitionTo.bind(null, RouteInfo.myaccount.name)}
            >
              <MKIcon glyph="cog" /> My account
            </BSMenuItem>
            <BSMenuItem divider />
            <BSMenuItem key="2"><MKIcon library="glyphicon" glyph="log-out" /> Logout</BSMenuItem>
          </BSDropdownButton>
        </BSNav>
      </BSNavbar>
    );
  }
});

module.exports = NavigationBar;
