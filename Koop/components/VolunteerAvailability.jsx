var React           = require("react");
var PropTypes       = React.PropTypes;
var BSInput         = require("react-bootstrap/Input");
var BSModalTrigger  = require("react-bootstrap/ModalTrigger");
var BSButton        = require("react-bootstrap/Button");
var BSButtonGroup   = require("react-bootstrap/ButtonGroup");
var BSCol           = require("react-bootstrap/Col");

var MKIcon          = require("components/Icon");
var MKTableSorter   = require("components/TableSorter");
var MKListModButtons= require("components/ListModButtons");
var MKItemEditModal = require("components/ItemEditModal");
var FormInputFactory= require("components/FormInputFactory");
var MKAbstractModal = require("components/AbstractModal");

var AvailabilityBoxInputs  = [
    {
      "properties": {
        "name": "dateInput",
        "placeholder": "YYYY/MM/DD",
        "label": "Enter date"
      },
     "type": "text"
    },
    {
      "properties": {
        "name": "dateMultiSelect",
        "label": "Select Days",
        "options": [
          {
            "name": "multiSelect_sunday",
            "value": "Sunday"
          },
          {
            "name": "multiSelect_monday",
            "value": "Monday"
          },
          {
            "name": "multiSelect_tuesday",
            "value": "Tuesday"
          },
          {
            "name": "multiSelect_wednesday",
            "value": "Wednesday"
          },
          {
            "name": "multiSelect_thursday",
            "value": "Thursday"
          },
          {
            "name": "multiSelect_friday",
            "value": "Friday"
          },
          {
            "name": "multiSelect_saturday",
            "value": "Saturday"
          }
        ]
      },
      "type": "select"
    },

    {
      "properties": {
        "name": "isrecurring",
        "label": "Set Recurring?",
        "isChecked": false
      },
      "type": "checkbox"
    },
    {
      "properties": {
        "name": "recurringUntil",
        "placeholder": "(YYYY/MM/JJ)",
        "label": "Recurring until "
      },
      "type": "text"
    },
    {
      "properties": {
        "name": "startTime",
        "placeholder": "HH:MM",
        "label": "Enter start time"
      },
      "type": "text"
    },
    {
      "properties": {
        "name": "duration",
        "placeholder": "How many hours",
        "label": "Enter duration (hours)"
      },
      "type": "text"
    }
];


var AvailabilityBox = React.createClass({
  propTypes: {
    inputs: PropTypes.array.isRequired
  },

  render: function(){
    inputElements = this.props.inputs.map(function(input,key){
      return (
        FormInputFactory(input.type,input.properties,key)
      );
    });
    return (
      <div>
        {inputElements}
      </div>
    );
  }
});


var modalBody = (
  <div>
      <AvailabilityBox inputs={AvailabilityBoxInputs} />
      <BSButton bsStyle="primary" type="submit">Confirm</BSButton>
  </div>
);

var TriggerAvailabilityModal = function(buttonName){
  return (
    <div>
      <BSModalTrigger modal={
        <MKAbstractModal 
          title="Enter your availability" 
          modalBody={modalBody} 
          useCloseButtonFooter={true} />} >
        <BSButton>{buttonName}</BSButton>
      </BSModalTrigger>
    </div>
  );
};     
 
var actionsGenerator = function(item){
  return [
    {
      icon: "minus",
      warningMessage: "Are you sure?",
      tooltip: {
        text: "Delete",
        overlayProps: {
          placement: "top"
        }
      }
    },
    {
      icon: "edit",
      tooltip: {
        text: "Edit Item",
        overlayProps: {
          placement: "right"
        }
      },
      customWrapper: function(component, iBtn){
        return (
          <BSModalTrigger
            key={iBtn}
            modal={<MKAbstractModal title="Enter your availability" modalBody={modalBody} useCloseButtonFooter={true} /> }
          >
            {component}
          </BSModalTrigger>
        );
      }
    },
  ];
}

 
var addButton =  TriggerAvailabilityModal("Add New");

var VolunteerAvailability = React.createClass({
  getInitialState: function(){
    return {
      items:  [
        {
          "id": 1,
          "col1": "2013/10/01",
          "col2": "Wednesday",
          "col3": "12:00",
          "col4": "3 Hours",
          "col5": "No"
        },
        {
          "id": 2,
          "col1": "2013/09/26",
          "col2": "Friday",
          "col3": "16:00",
          "col4": "2 Hours",
          "col5": "No"
        }
      ]
    }
  },
  render: function(){
    // TableSorter Config
    var CONFIG = {
      columns: {
        id: { name: "ID" },
        col1: { name: "Date" },
        col2: { name: "Day Of Week" },
        col3: { name: "Start Time" },
        col4: { name: "Duration" },
        col5: { name: "Reoccuring" },
        editCol: {
          name: "Actions",
          disableSort: true,
          disableFilter: true,
          cellGenerator: function(item){
            var self = this;
            return (
              <MKListModButtons
                defaultTooltipDelay={500}
                buttons={actionsGenerator.call(this,item)}
              />
            );
          }
        }
      }
    };


   var filter = false;
    return (
      <div>
        <BSCol md={12}>
        <div>
          <MKTableSorter
            config={CONFIG}
            items={this.state.items}
            headerRepeat={8}
            striped
            bordered
            condensed
            hover
          />
        </div>
        {addButton}
      </BSCol>
        
      </div>
    );
  }
});

module.exports = VolunteerAvailability;