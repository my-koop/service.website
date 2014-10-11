var React = require("react");
var BSCol = require("react-bootstrap/Col");
var MKEditableFieldList = require("components/EditableFieldList");
var MKCollapsablePanel = require("components/CollapsablePanel");

// mock data
var fields = [
  {
    label: "Age",
    type: "number"
  },
  {
    label: "How did you find us",
    type: "select",
    defaultOption: "visit",
    options: [
      {display: "On-Site Visit"},
      {display: "Friend referral"},
      {display: "Ads"},
      {display: "Other"}
    ]
  },
  {
    label: "Bike Usage",
    type: "select",
    defaultOption: "everyday",
    options: [
      {display: "Every Day"},
      {display: "Few times a week"},
      {display: "Few times a month"},
      {display: "Few times a year"},
      {display: "Never"}
    ]
  },
  {
    label: "Why do you use a bike",
    type: "text",
    description: "Describe why you mainly use your bike"
  }
];

var OptionsPage = React.createClass({

  render: function() {
    return (
      <BSCol md={12}>
        <MKCollapsablePanel header="User optional fields" defaultExpanded>
          <MKEditableFieldList fields={fields} />
        </MKCollapsablePanel>
        <MKCollapsablePanel header="Other options">
          Under construction
        </MKCollapsablePanel>
      </BSCol>
    );
  }
});

module.exports = OptionsPage;