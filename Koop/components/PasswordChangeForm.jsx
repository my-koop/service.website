var React = require("react/addons");
var BSInput = require("react-bootstrap/Input");
var BSAlert = require("react-bootstrap/Alert");

var PasswordChangeForm = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return {
      message: null,
      hasMessageError: false,
      hasNewPwdError: false,
      hasConfirmPwdError: false
    };
  },

  onSubmit: function(e){
    e.preventDefault();
    var formState = {
      message: "Success",
      hasMessageError: false,
      hasNewPwdError: false,
      hasConfirmPwdError: false
    };

    if(!this.state.pwd1 || !this.state.pwd2 || !this.state.oldpwd){
      formState.message = "All fileds must be filled";
      formState.hasMessageError = true;

    } else if(this.state.pwd1 === this.state.oldpwd){
      formState.message = "New password cannot be the same as the old one";
      formState.hasMessageError = true;
      formState.hasNewPwdError = true;

    } else if(this.state.pwd1 !== this.state.pwd2){
      formState.message = "Password confirmation doesn't match";
      formState.hasMessageError = true;
      formState.hasConfirmPwdError = true;

    }
    this.setState(formState);
  },

  getMessageStyle: function(){
    return (this.state.hasMessageError && "danger") || "success";
  },

  getNewPwdStyle: function(){
    return (this.state.hasNewPwdError && "error") || null;
  },

  getConfPwdStyle: function(){
    return (this.state.hasConfirmPwdError && "error") || null;
  },

  render: function() {
    return (
      <div>
        {this.state.message ?
          <BSAlert bsStyle={this.getMessageStyle()}>
            {this.state.message}
          </BSAlert>
        : null}
        <form onSubmit={this.onSubmit}>
          <BSInput
            type="password"
            label="Old Password"
            valueLink={this.linkState("oldpwd")}
          />
          <BSInput
            type="password"
            label="New Password"
            valueLink={this.linkState("pwd1")}
            bsStyle={this.getNewPwdStyle()}
            hasFeedback
          />
          <BSInput
            type="password"
            label="Confirm Password"
            valueLink={this.linkState("pwd2")}
            bsStyle={this.getConfPwdStyle()}
            hasFeedback
          />
          <BSInput type="submit" bsStyle="primary" value="Update Password" />
        </form>
      </div>
    );
  }
});

module.exports = PasswordChangeForm;
