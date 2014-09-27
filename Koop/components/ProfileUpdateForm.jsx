var React = require("react");
var BSCol = require("react-bootstrap/Col");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");

var ProfileUpdateForm = React.createClass({

  onSubmit: function(e){
    return false;
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <BSInput 
            type="email" 
            label="E-Mail" 
          />
          <BSInput 
            type="text" 
            label="First Name"
          />
          <BSInput 
            type="text" 
            label="Last Name"
          />
          <BSInput type="submit" bsStyle="primary" value="Update Profile" />
        </form>
      </div>
    );
  }
});

module.exports = ProfileUpdateForm;
