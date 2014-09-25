var React = require("react");

var MKNavigationBar = require("components/NavigationBar");
var BSGrid = require("react-bootstrap/Grid");
var BSRow = require("react-bootstrap/Row");
var BSButton = require("react-bootstrap/Button");

var RouteInformation = require("routeInformation");

var App = React.createClass({
  getInitialState: function () {
    return {
      hidden:false
    };
  },
  showHideClick : function(){
    var state = this.state;
    state.hidden = !state.hidden;
    this.setState(state);
  },
  render: function() {
    var showHideButtonName = this.state.hidden? "Show dev NavBar":"Hide dev NavBar";
    return (
      <BSGrid fluid={true}>
        <BSRow>
          <BSButton onClick={this.showHideClick}>{showHideButtonName}</BSButton>
          <MKNavigationBar hidden={this.state.hidden} contentUrl={RouteInformation.devNavBar.fullPath}/>
        </BSRow>
        <BSRow style={{border:"1px solid black"}}>
            {this.props.activeRouteHandler()}
        </BSRow>
      </BSGrid>
    );
  }
});

module.exports = App;
