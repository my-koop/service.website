var React = require("react");
var PropTypes = React.PropTypes;
var BSButton = require("react-bootstrap/Button");
var BSInput = require("react-bootstrap/Input");
var FormInputFactory = require("mykoop-core/components/FormInputFactory");

var inputProperties =  {
  "properties": {
    "name": "subject",
    "placeholder": "Subject Line",
    "label": "Subject Line"
  },
  "type": "text"
};
var subjectInput =  FormInputFactory(inputProperties.type, inputProperties.properties);

var ListPickerProperties ={
  "properties": {
    "name": "mailingListPicker",
    "label": "Select a mailing list",
    "options": [
      {
        "name": "mailinglist_promotion",
        "value": "Promotion"
      },
      {
        "name": "mailinglist_events",
        "value": "Special Events"
      },
      {
        "name": "mailinglist_misc",
        "value": "Misc"
      }
    ]
  },
  "type" : "select"
};
var MailingListPicker = FormInputFactory(ListPickerProperties.type,ListPickerProperties.properties);

var MailingListSend = React.createClass({
  propTypes : {

  },

  render: function () {
    return (
      <div className="clearfix">
        {MailingListPicker}
        {subjectInput}
        <BSInput  type="textarea" placeholder="Message" />
        <BSButton type="submit" onSubmit={this.onSubmit} className="pull-right"> Send </BSButton>
      </div>
    )
  }

});

module.exports = MailingListSend;
