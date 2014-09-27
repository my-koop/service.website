var React = require("react");
var PropTypes = React.PropTypes;
var BSCol = require("react-bootstrap/Col");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSButtonGroup = require("react-bootstrap/ButtonGroup");
var BSPanel = require("react-bootstrap/Panel");
var BSAlert = require("react-bootstrap/Alert");

var LoginBox = React.createClass({

  propTypes : {
  },

  getInitialState: function(){
    return {
      errorMessage: ""
    };
  },

  componentDidMount: function(){
    var self = this;
    require.ensure([],function(require){
      self.styles = require("login.useable.less")
      self.styles.use();
    })
  },

  componentWillUnmount : function(){
    if(this.styles){
      this.styles.unuse();
    }
  },
  
  getSuccessStyle: function(state){
    switch(state){
      case 1: return "success";
      case 2: return "error";
      case 3: return "warning";
      default: return "";
    }
  },

  onSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getValue();
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
      <BSCol sm={6} smOffset={3} md={4} mdOffset={4} lg={3} lgOffset={4.5}>
        <div>
          <BSPanel header="Please Sign In">
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
                ref="email"
              />
              <BSInput 
                type="password" 
                placeholder="Password" 
                label="Password" 
                bsStyle={this.getSuccessStyle(this.state.pwdState)} 
                hasFeedback 
              />
              <BSInput type="checkbox" label="Remember Me" />
              <BSInput block type="submit" bsStyle="success" bsSize="large" value="Login" />
            </form>
            <BSButtonGroup vertical style={{display:"block"}}>
              <BSButton block bsStyle="primary">Create your account</BSButton>
              <BSButton block bsStyle="info" >Forgot your password</BSButton>
            </BSButtonGroup>
          </BSPanel>
        </div>
      </BSCol>
    );
  }
});

module.exports = LoginBox;
