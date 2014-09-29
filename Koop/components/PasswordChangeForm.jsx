var React = require("react");
var BSInput = require("react-bootstrap/Input");

var PasswordChangeForm = React.createClass({

  onSubmit: function(e){
    e.preventDefault();
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
