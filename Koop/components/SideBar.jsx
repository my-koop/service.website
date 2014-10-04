var React = require("react");
var Router = require("react-router");
var RouteInfo = require("routeInformation");

var BSCol = require("react-bootstrap/Col");
var BSListGroup = require("react-bootstrap/ListGroup");
var BSListGroupItem = require("react-bootstrap/ListGroupItem");

var MKIcon = require("components/Icon");

var PropTypes = React.PropTypes;

var SideBar = React.createClass({
  goToPage: function(page) {
    Router.transitionTo(page);
  },

  render : function() {
    return (
      <div className="sidebar col-md-2">
        <BSListGroup>
          <BSListGroupItem
            key={10}
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.members.name
            )}
          >
            <MKIcon glyph="users" fixedWidth /> Members
          </BSListGroupItem>
          <BSListGroupItem
            key={11}
            className="sub-list-group-item"
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.members.name
            )}
          >
            <MKIcon glyph="list-ul" fixedWidth /> Manage
          </BSListGroupItem>
          <BSListGroupItem
            key={12}
            className="sub-list-group-item"
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.members.name
            )}
          >
            <MKIcon glyph="check" fixedWidth /> Permission Sets
          </BSListGroupItem>
          <BSListGroupItem
            key={20}
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.items.name
            )}
          >
            <MKIcon glyph="table" fixedWidth /> Inventory
          </BSListGroupItem>
          <BSListGroupItem
            key={30}
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.transaction.name
            )}
          >
            <MKIcon glyph="exchange" fixedWidth /> Transactions
          </BSListGroupItem>
          <BSListGroupItem
            key={40}
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.mailing.name
            )}
          >
            <MKIcon glyph="envelope" fixedWidth /> Mailing Lists
          </BSListGroupItem>
          <BSListGroupItem
            key={50}
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.mailing.name
            )}
          >
            <MKIcon glyph="clock-o" fixedWidth /> Volunteers
          </BSListGroupItem>
          <BSListGroupItem
            key={60}
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.stats.name
            )}
          >
            <MKIcon glyph="bar-chart" fixedWidth /> {"Reports & Statistics"}
          </BSListGroupItem>
          <BSListGroupItem
            key={70}
            href="#"
            onClick={this.goToPage.bind(
              null,
              RouteInfo.options.name
            )}
          >
            <MKIcon glyph="cogs" fixedWidth /> Advanced Settings
          </BSListGroupItem>
        </BSListGroup>
      </div>
    );
  }
});

module.exports = SideBar;
