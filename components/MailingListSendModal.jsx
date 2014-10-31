var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");

var MKMailingListSendBox = require("./MailingListSendBox");

var MailingListSendModal = React.createClass({

  render: function(){
    return this.transferPropsTo(
      <BSModal title="Contact Mailing List" bsSize="small">
        <div className="modal-body" >
          <MKMailingListSendBox />
        </div>
        <div className="modal-footer">
          <BSButton>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = MailingListSendModal;
