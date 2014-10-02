var React = require("react");
var Router = require("react-router");
var RouteInfo = require("routeInformation");

var BSDropdownButton = require("react-bootstrap/DropdownButton");
var BSMenuItem = require("react-bootstrap/MenuItem");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");
var BSNavbar = require("react-bootstrap/Navbar");
var BSNav = require("react-bootstrap/Nav");
var BSNavItem = require("react-bootstrap/NavItem");

var MKIcon = require("components/Icon");
var MKLoginModal = require("components/LoginModal");
var MKNavItemLink = require("components/NavItemLink");

//To be removed after development.
//var MKDevMenu = require("components/DevMenu");

var PropTypes = React.PropTypes;


// NavigationBar
var NavBar = React.createClass({
  getInitialState: function() {
    return {
      isLoggedIn: false
    };
  },

  onFakeLogin: function(nowLoggedIn) {
    var nowLoggedIn = typeof nowLoggedIn === "boolean" ? nowLoggedIn : !this.state.isLoggedIn;
    this.setState({isLoggedIn: nowLoggedIn});
  },

  onMenuLogin: function() {
    this.refs.loginmodal.show();
  },

  render : function() {
    var isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        {/*FIXME: Dummy span so we can use the modal trigger... :( */}
        <BSModalTrigger ref="loginmodal" modal={<MKLoginModal />}><span /></BSModalTrigger>
        <BSNavbar
          toggleNavKey={1}

          //FIXME: Tried to wrap this with a Router Link and had weird rendering
          // errors, will try again later. The point is to click on the logo and
          // get to the homepage as well.
          brand={<img
            src="/coopbeciklogo.png"
            title="Coop Bécik"
            alt="Coop Bécik logo"

            //FIXME: Remove after prototype.
            onClick={this.onFakeLogin}
          />}
        >
          <BSNav key={1} className="navbar-left">
            <MKNavItemLink to={RouteInfo.homepage.name}>
              <MKIcon glyph="home" /> Home
            </MKNavItemLink>
            <MKNavItemLink to={RouteInfo.shop.name}>
              <MKIcon glyph="shopping-cart" /> Shop
            </MKNavItemLink>
            <MKNavItemLink to={RouteInfo.aboutUs.name}>
              <MKIcon glyph="question" /> About Us
            </MKNavItemLink>
          </BSNav>
          <BSNav key={2} className="navbar-right">
            {isLoggedIn ?
              <BSDropdownButton
                key={1}
                //FIXME: Hardcoded, temporary "username".
                title={<span><MKIcon glyph="user" /> sexytricycle</span>}
              >
                <BSMenuItem
                  key={1}
                  onSelect={Router.transitionTo.bind(null, RouteInfo.myaccount.name)}
                >
                  <MKIcon glyph="cog" /> My account
                </BSMenuItem>
                <BSMenuItem divider />
                <BSMenuItem key={2} onSelect={this.onFakeLogin.bind(null, false)}>
                  <MKIcon library="glyphicon" glyph="log-out" /> Logout
                </BSMenuItem>
              </BSDropdownButton>
            :
              <BSNavItem onSelect={this.onMenuLogin}>
                <MKIcon library="glyphicon" glyph="log-in" /> Login
              </BSNavItem>
            }
            {!isLoggedIn ?
              <MKNavItemLink to={RouteInfo.register.name}>
                <MKIcon glyph="check" /> Register
              </MKNavItemLink>
            : null}
            <MKNavItemLink to={RouteInfo.homepage.name}>
              <MKIcon glyph="globe" /> French
            </MKNavItemLink>
            <MKNavItemLink to={RouteInfo.homepage.name}>
              <MKIcon glyph="question-circle" /> Help
            </MKNavItemLink>
          </BSNav>

          {/* To be removed after development. */}
          {/*<MKDevMenu />*/}
        </BSNavbar>
      </div>
    );
  }
});

module.exports = NavBar;
