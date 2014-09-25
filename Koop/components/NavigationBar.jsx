var React = require("react");
var RBS = require("react-bootstrap");

var Router = require("react-router");

var routeInfo = require("routeInformation");
var ajax = require("ajax");

var NavItemLink = React.createClass({
  mixins: [ Router.ActiveState ],

  getInitialState: function () {
    return {
      isActive: false
    };
  },

  updateActiveState: function() {
    this.setState({
      isActive: false
      //FIXME: For now "/" is considered active when in "/users".
      //isActive: NavItemLink.isActive(this.props.to, this.props.params, this.props.query)
    });
  },

  render: function() {
    return this.transferPropsTo(
      <RBS.NavItem
        active={this.state.isActive}
        onClick={this.handleClick}
      >
        {this.props.children}
      </RBS.NavItem>
    );
  },

  handleClick: function(e) {
    e.preventDefault();

    Router.transitionTo(this.props.to, this.props.params, this.props.query);
  }
});

// NavigationBar
var NavigationBar = React.createClass({
  propTypes: {
    links: React.PropTypes.array
  },

  getInitialState: function () {
    return {
      links: [{
        name: "index",
        url: "/"
      }]
    };
  },

  componentDidMount: function () {
    var self = this;

    ajax.request(
      {endpoint: routeInfo.navBar.fullPath},
      function (err, res) {
        if (err) {
          console.error(routeInfo.navBar.fullPath, status, err.toString());
          return;
        }

        if (res.body.links) {
          self.setState(res.body);
        }
      }
    );
  },
  render : function() {
    if(this.props.hidden){
      return null;
    }
    var links = this.state.links.map(function(link, index) {
      return (
        <NavItemLink
          key={index}
          to={link.url}
        >
          {link.name}
        </NavItemLink>
      );
    });
    return (
      <span>
        <RBS.Navbar toggleNavKey={1}>
          <RBS.Nav key={1}>
            {links}
          </RBS.Nav>
        </RBS.Navbar>
      </span>
    );
  }
});

module.exports = NavigationBar;
