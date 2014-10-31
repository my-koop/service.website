var React = require("react");
var BSPanel = require("react-bootstrap/Panel");
var MKMailingListSendBox = require("./MailingListSendBox");

var MailingListSendPage = React.createClass({

  render: function() {
    return (
      <BSPanel header="Contact Mailing List">
        <MKMailingListSendBox />
      </BSPanel>
    );
  }
});

module.exports = MailingListSendPage;
