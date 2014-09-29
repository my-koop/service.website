var React = require("react");
var PropTypes = React.PropTypes;
var BSCol = require("react-bootstrap/Col");
var BSPanel = require("react-bootstrap/Panel");
var BSInput = require("react-bootstrap/Input");
var BSAlert = require("react-bootstrap/Alert");
var style = require("grayBg.useable.less");

var PasswordRecoveryPage = React.createClass({

  getInitialState: function(){
    return {
      // 1 = success, 2 = error
      success: null
    };
  },

  componentDidMount: function(){
    style.use();
  },

  componentWillUnmount : function(){
    style.unuse();
  },
  
  hasSentSuccessfully: function(){
    return this.state.success === 1;
  },

  getInputStyle: function(){
    switch(this.state.success) {
      case 1: return "success";
      case 2: return "error";
      default: return null;
    }
  },

  getMessageStyle: function(){
    switch(this.state.success) {
      case 1: return "success";
      case 2: return "danger";
      default: return null;
    }
  },

  getMessage: function(){
    switch(this.state.success) {
      case 1: return "Successfully sent procedure to your e-mail";
      case 2: return "Invalid E-Mail address";
      default: return null;
    }
  },

  onSubmit: function(e){
    // Prevents sending another request if it succeeded
    if(!this.hasSentSuccessfully()){
      this.setState({
        success: Math.floor( Math.random() * 2 ) + 1
      });
    }
    e.preventDefault();
  },

  render: function() {
    return (
      <BSCol sm={6} smOffset={3} md={4} mdOffset={4} lg={3} lgOffset={4.5}>
        <BSPanel header="Password Recovery">
          {this.state.success ?
            <BSAlert bsStyle={this.getMessageStyle()}>
              {this.getMessage()}
            </BSAlert>
          : null}
          <form onSubmit={this.onSubmit}>
            <BSInput
              type="email"
              label="E-Mail"
              bsStyle={this.getInputStyle()}
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
