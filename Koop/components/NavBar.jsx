var React = require("react");
var Router = require("react-router");
var RouteInfo = require("routeInformation");

var BSButton = require("react-bootstrap/Button");
var BSDropdownButton = require("react-bootstrap/DropdownButton");
var BSInput = require("react-bootstrap/Input");
var BSMenuItem = require("react-bootstrap/MenuItem");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");
var BSNavbar = require("react-bootstrap/Navbar");
var BSNav = require("react-bootstrap/Nav");
var BSNavItem = require("react-bootstrap/NavItem");

var MKDevMenu = require("components/DevMenu");
var MKIcon = require("components/Icon");
var MKLoginModal = require("components/LoginModal");
var MKNavItemLink = require("components/NavItemLink");

var PropTypes = React.PropTypes;


// NavigationBar
var NavigationBar = React.createClass({
  propTypes: {
  },

  onMenuLogin: function() {
    console.log("Login!");
    this.refs.loginmodal.show();
  },

  render : function() {
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
            {!this.props.loggedIn ?
              <BSNavItem onSelect={this.onMenuLogin}>
                <MKIcon library="glyphicon" glyph="log-in" /> Login
              </BSNavItem>
            : null}
            {this.props.loggedIn ?
              <BSDropdownButton
                key={1}
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
            :
              <BSDropdownButton
                key={1}
                title={
                  <span>
                    <MKIcon library="glyphicon" glyph="log-in" /> Login
                  </span>
                }
              >
                {/*TODO: Change for MKLoginModal. */}
                <BSMenuItem header>
                  <BSInput
                    type="text"
                    //FIXME:
                    // https://github.com/react-bootstrap/react-bootstrap/issues/242
                    className="input-sm"
                    label="Email"
                    placeholder="Email"
                  />
                  <BSInput
                    type="password"
                    className="input-sm"
                    label="Password"
                    placeholder="Password"
                  />
                  <BSButton bsStyle="primary" block>Login</BSButton>
                </BSMenuItem>
                <BSMenuItem divider />
                <BSMenuItem key="2"><MKIcon glyph="question" /> Forgot password</BSMenuItem>
              </BSDropdownButton>
            }
            {!this.props.loggedIn ?
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

module.exports = NavigationBar;
