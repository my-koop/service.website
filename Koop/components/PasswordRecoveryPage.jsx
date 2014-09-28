var React = require("react");
var PropTypes = React.PropTypes;
var BSCol = require("react-bootstrap/Col");
var BSPanel = require("react-bootstrap/Panel");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSAlert = require("react-bootstrap/Alert");
var style = require("login.useable.less");

var PasswordRecoveryPage = React.createClass({

  getInitialState: function(){
    return {
      recoveryState: null,
      messageState: null,
      recoveryMessage: null
    };
  },

  componentDidMount: function(){
    style.use();
  },

  componentWillUnmount : function(){
    style.unuse();
  },
  
  hasSentSuccessfully: function(){
    return this.state.recoveryState === "success";
  },

  onSubmit: function(e){
    // Prevents sending another request if it succeeded
    if(!this.hasSentSuccessfully()){
      var success = Math.floor( Math.random() * 2 );
      this.setState({
        recoveryState: success ? "success" : "error",
        messageState: success ? "success" : "danger",
        recoveryMessage: success ? 
          "Successfully sent procedure to your e-mail" : 
          "Invalid E-Mail address"
      });
    }
    return false;
  },

  render: function() {
    return (
      <BSCol sm={6} smOffset={3} md={4} mdOffset={4} lg={3} lgOffset={4.5}>
        <BSPanel header="Password Recovery">
          {this.state.recoveryMessage ?
            <BSAlert bsStyle={this.state.messageState}>
              {this.state.recoveryMessage}
            </BSAlert>
          : null}
          <form onSubmit={this.onSubmit}>
            <BSInput
              type="email"
              label="E-Mail"
              bsStyle={this.state.recoveryState}
              hasFeedback
            />
            { !this.hasSentSuccessfully() ?
              <BSInput type="submit" bsStyle="primary" bsSize="large" value="Submit" />
            : null}
          </form>
        </BSPanel>
      </BSCol>
    );
  }
});

module.exports = PasswordRecoveryPage;
