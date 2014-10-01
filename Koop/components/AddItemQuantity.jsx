var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSButtonGroup = require("react-bootstrap/ButtonGroup");

var AddItemQuantity = React.createClass({

  propTypes: {
    state: PropTypes.object,
    saveStateCallback: PropTypes.func.isRequired
  },

  getDefaultProps: function(){
    return {
      saveStateCallback:function(){}
    };
  },

  getInitialState: function(){
    return {
      idItem : this.props.idItem || 999
    };
  },
  
  componentWillUnmount: function(){
    this.props.saveStateCallback(this.state);
  },

  render: function() {
    return (
     
      <div>
        <BSButton>Edit item {this.state.idItem} </BSButton>
      </div>
      
    );
  }
});

module.exports = AddItemQuantity;
