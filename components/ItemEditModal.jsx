var React = require("react");
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");
var BSInput= require("react-bootstrap/Input");

var ItemEditModal = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <BSModal title={"Editing item " + this.props.name} backdrop="static">
        <div className="modal-body" > 

        <BSInput type="static" label="ID" placeholder="ID" value={this.props.itemId} />
          <BSInput type="text" label="Item Name" placeholder="Name" defaultValue={this.props.name} />
          <BSInput type="text" label="Price" placeholder="Price"/>
        </div>
        
        <div className="modal-footer">
          <BSButton onClick={this.props.onRequestHide}>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = ItemEditModal;