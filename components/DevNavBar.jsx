var React = require("react");
var PropTypes = React.PropTypes;
var MKNavigationBar = require("mykoop-core/components/NavigationBar");
var BSButton = require("react-bootstrap/Button");

var RouteInformation = require("routeInformation");

var DevNavBar = React.createClass({

  propTypes : {
    hide: PropTypes.bool
  },

  getDefaultProps : function() {
    return {
      hide: false
    }
  },

  getInitialState: function () {
    return {
      isDevBarHidden: this.props.hide
    };
  },

  toggleDevBarDisplay : function(){
    this.setState({isDevBarHidden: !this.state.isDevBarHidden});
  },

  render: function() {
    var showHideButtonName = this.state.isDevBarHidden ? "Show Dev NavBar" : "Hide Dev NavBar";
    return (
      <div>
        <div className="text-center">
          <BSButton onClick={this.toggleDevBarDisplay} bsSize="small">{showHideButtonName}</BSButton>
        </div>
        <div hidden={this.state.isDevBarHidden}>
          <MKNavigationBar contentUrl={RouteInformation.devNavBar.fullPath}/>
        </div>
      </div>
    );
  }
});

module.exports = DevNavBar;
