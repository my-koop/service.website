var React = require("react");
var PropTypes = React.PropTypes;
var BSCol = require("react-bootstrap/Col");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSButtonGroup = require("react-bootstrap/ButtonGroup");
var BSPanel = require("react-bootstrap/Panel");

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
  
  onSubmit: function(e){
    e.preventDefault();
    alert("You signed in bro!");
  },

  render: function() {
    return (
      <BSCol sm={6} smOffset={3} md={4} mdOffset={4} lg={3} lgOffset={4.5}>
        <div>
          {this.state.errorMessage ?
            <div className="form-error">
              {this.state.errorMessage}
            </div>
          : null}
          <BSPanel header="Please Sign In">
            <form onSubmit={this.onSubmit}>
              <BSInput type="email" placeholder="E-Mail" />
              <BSInput type="password" placeholder="Password" />
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
