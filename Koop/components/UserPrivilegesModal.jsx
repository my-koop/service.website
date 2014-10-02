var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");

var MKUserPrivilegesBox = require("components/UserPrivilegesBox");


var UserPrivilegesModal = React.createClass({

  render: function(){
    return this.transferPropsTo(
      <BSModal title="Assign Privileges" bsSize="small">
        <div className="modal-body" > 
          <MKUserPrivilegesBox />
        </div>
        <div className="modal-footer">
          <BSButton onClick={this.props.onRequestHide}>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = UserPrivilegesModal;