var React = require("react");
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");

var MKLoginBox = require("components/LoginBox");

var loginState = {};
var saveLoginState = function(state){
  loginState = state;
};

var LoginModal = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <BSModal title="Please Sign In" bsSize="small">
        <div className="modal-body" > 
          <MKLoginBox state={loginState} saveStateCallback={saveLoginState}/>
        </div>
        <div className="modal-footer">
          <BSButton onClick={this.props.onRequestHide}>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = LoginModal;
