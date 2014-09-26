var React = require("react/addons");

var MKNavigationBar = require("components/NavigationBar");
var BSGrid = require("react-bootstrap/Grid");
var BSRow = require("react-bootstrap/Row");
var BSButton = require("react-bootstrap/Button");

var RouteInformation = require("routeInformation");

var App = React.createClass({
  getInitialState: function () {
    return {
      isDevBarHidden:true
    };
  },
  toggleDevBarDisplay : function(){
    this.setState({isDevBarHidden: !this.state.isDevBarHidden});
  },
  render: function() {
    var showHideButtonName = this.state.isDevBarHidden ? "Show Dev NavBar" : "Hide Dev NavBar";
    var classes = React.addons.classSet({
      hidden:this.state.isDevBarHidden
    });
    return (
      <BSGrid fluid>
        <BSRow>
          <BSButton onClick={this.toggleDevBarDisplay} bsSize="small">{showHideButtonName}</BSButton>
          <div className={classes}>
            <MKNavigationBar contentUrl={RouteInformation.devNavBar.fullPath}/>
          </div>
        </BSRow>
        <BSRow style={{border:"1px solid black"}}>
            {this.props.activeRouteHandler()}
        </BSRow>
      </BSGrid>
    );
  }
});

module.exports = App;
