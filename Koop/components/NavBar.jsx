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
  propTypes: {
    dashboard: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      dashboard: false
    };
  },

  getInitialState: function() {
    return {
      isLoggedIn: this.props.dashboard
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
    var isInDashboard = this.props.dashboard;

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
          fixedTop
          fluid={this.props.dashboard}
        >
          <BSNav key={1} className="navbar-left">
            {isInDashboard ? [
              <MKNavItemLink key={10} to={RouteInfo.members.name}>
                <MKIcon glyph="users" fixedWidth /> Members
              </MKNavItemLink>,
              <MKNavItemLink key={20} to={RouteInfo.items.name}>
                <MKIcon glyph="bicycle" fixedWidth /> Items
              </MKNavItemLink>,
              <MKNavItemLink key={30} to={RouteInfo.homepage.name}>
                <MKIcon glyph="book" fixedWidth /> Invoices
              </MKNavItemLink>,
              <MKNavItemLink key={40} to={RouteInfo.events.name}>
                <MKIcon glyph="calendar" fixedWidth /> Events
              </MKNavItemLink>,
              <MKNavItemLink key={50} to={RouteInfo.stats.name}>
                <MKIcon glyph="files-o" fixedWidth /> Reports
              </MKNavItemLink>,
              <BSDropdownButton
                key={60}
                title={
                  <span>
                    <MKIcon glyph="bolt" fixedWidth /> Quick Actions
                  </span>
                }
              >
                <BSMenuItem
                  key={10}
                  onSelect={Router.transitionTo.bind(
                    null,
                    RouteInfo.homepage.name
                  )}
                >
                  <MKIcon glyph="plus" fixedWidth /> Add Member
                </BSMenuItem>
                <BSMenuItem
                  key={20}
                  onSelect={Router.transitionTo.bind(
                    null,
                    RouteInfo.mailingSend.name
                  )}
                >
                  <MKIcon glyph="envelope" fixedWidth /> Send Mass Message
                </BSMenuItem>
              </BSDropdownButton>
            ] : [
              <MKNavItemLink key={10} to={RouteInfo.homepage.name}>
                <MKIcon glyph="home" /> Homepage
              </MKNavItemLink>,
              <MKNavItemLink key={20} to={RouteInfo.shop.name}>
                <MKIcon glyph="shopping-cart" /> Shop
              </MKNavItemLink>,
              <MKNavItemLink key={30} to={RouteInfo.aboutUs.name}>
                <MKIcon glyph="question" /> About Us
              </MKNavItemLink>
            ]}
          </BSNav>
          {/*FIXME: Hide on small viewports for now since it doesn't wrap.*/}
          <BSNav key={2} className="navbar-right hidden-xs">
            {isLoggedIn ?
              <BSDropdownButton
                //FIXME: Hardcoded, temporary "username".
                title={<span><MKIcon glyph="user" /> sexytricycle</span>}
              >
                <BSMenuItem
                  key={10}
                  onSelect={Router.transitionTo.bind(null, RouteInfo.myaccount.name)}
                >
                  <MKIcon glyph="cog" fixedWidth /> My account
                </BSMenuItem>
                <BSMenuItem key={20} divider />
                <BSMenuItem key={30} onSelect={this.onFakeLogin.bind(null, false)}>
                  <MKIcon glyph="sign-out" fixedWidth /> Logout
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
            {!isInDashboard ? [
              <MKNavItemLink to={RouteInfo.homepage.name}>
                <MKIcon glyph="globe" /> French
              </MKNavItemLink>,
              <MKNavItemLink to={RouteInfo.homepage.name}>
                <MKIcon glyph="question-circle" /> Help
              </MKNavItemLink>
            ] : null}
          </BSNav>

          {/* To be removed after development. */}
          {/*<MKDevMenu />*/}
        </BSNavbar>
      </div>
    );
  }
});

module.exports = NavBar;
