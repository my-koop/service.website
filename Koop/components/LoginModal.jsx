var React = require("react");
var BSButton = require("react-bootstrap/Button");
var MKAbstractModal = require("components/AbstractModal");

var MKLoginBox = require("components/LoginBox");

var loginState = {};
var saveLoginState = function(state){
  loginState = state;
};

var onLoginSuccess = function(){
  console.log("success");
};

var LoginBody   = <MKLoginBox state={loginState} saveStateCallback={saveLoginState} onLoginSuccess={onLoginSuccess}/>
var LoginTitle  = "Please Sign In";

var LoginModal = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <MKAbstractModal title={LoginTitle} modalBody={LoginBody} useCloseButtonFooter={true} />
    );
  }
});

module.exports = LoginModal;
