var React = require("react");
var BSCol = require("react-bootstrap/Col");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");

var PasswordChangeForm = React.createClass({

  onSubmit: function(e){
    return false;
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <BSInput 
            type="password" 
            label="Old Password" 
          />
          <BSInput 
            type="password" 
            label="New Password" 
          />
          <BSInput type="submit" bsStyle="primary" value="Update Password" />
        </form>
      </div>
    );
  }
});

module.exports = PasswordChangeForm;
