var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSButtonGroup = require("react-bootstrap/ButtonGroup");
var BSAlert = require("react-bootstrap/Alert");

var LoginBox = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    state: PropTypes.object,
    saveStateFunction: PropTypes.func
  },

  getInitialState: function(){
    return this.props.state || {};
  },
  
  componentWillUnmount: function(){
    if(this.props.saveStateFunction){
      this.props.saveStateFunction(this.state);
    }
  },

  getSuccessStyle: function(state){
    switch(state){
      case 1: return "success";
      case 2: return "error";
      case 3: return "warning";
      default: return null;
    }
  },

  onSubmit: function(e){
    e.preventDefault();
    var r1 = Math.floor(Math.random()*3)+1;
    var r2 = (r1 == 1 && Math.floor(Math.random()*2)+1) || 0;
    var errorMessage = 
      (r1==2 && "Invalid E-Mail address") ||
      (r1==3 && "Unrecognised E-Mail address") ||
      (r2==2 && "Invalid Password") ||
      "";
    this.setState({
      emailState: r1,
      pwdState: r1 && r2,
      errorMessage: errorMessage
    });
  },

  render: function() {
    return (
      <div>
        {this.state.errorMessage ?
          <BSAlert bsStyle="warning">
            {this.state.errorMessage}
          </BSAlert>
        : null}
        <form onSubmit={this.onSubmit}>
          <BSInput 
            type="email" 
            placeholder="E-Mail" 
            label="E-Mail" 
            bsStyle={this.getSuccessStyle(this.state.emailState)} 
            hasFeedback 
            valueLink={this.linkState("email")}
          />
          <BSInput 
            type="password" 
            placeholder="Password" 
            label="Password" 
            bsStyle={this.getSuccessStyle(this.state.pwdState)} 
            hasFeedback 
            valueLink={this.linkState("password")}
          />
          <BSInput type="checkbox" label="Remember Me" checkedLink={this.linkState("rememberMe")}/>
          <BSInput block type="submit" bsStyle="success" bsSize="large" value="Login" />
        </form>
        <BSButtonGroup vertical style={{display:"block"}}>
          <BSButton block bsStyle="primary">Create your account</BSButton>
          <BSButton block bsStyle="info" >Forgot your password</BSButton>
        </BSButtonGroup>
      </div>
    );
  }
});

module.exports = LoginBox;
