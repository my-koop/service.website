var React = require("react");
var PropTypes = React.PropTypes;
var BSInput = require("react-bootstrap/Input");
var BSModal = require("react-bootstrap/Modal");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");
var BSButton = require("react-bootstrap/Button");
var BSButtonGroup = require("react-bootstrap/ButtonGroup");

var FilterableItemList = require("components/FilterableItemList");
var FormInputFactory   = require("components/FormInputFactory");

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

var AvailabilityModal = React.createClass({
  render: function(){
    return (
      <BSModal title="Enter your availability" bsSize="small">
        <div className="modal-body">
          <AvailabilityBox inputs={AvailabilityBoxInputs} />
        </div>
        <div className="modal-footer">
          <BSButton onClick={this.props.onRequestHide}>Close</BSButton>
          <BSButton type="submit">Confirm</BSButton>
        </div>
      </BSModal>
    );
  }
});

var TriggerAvailabilityModal = function(buttonName){
  return (
    <div>
      <BSModalTrigger modal={<AvailabilityModal />} >
        <BSButton>{buttonName}</BSButton>
      </BSModalTrigger>
    </div>
  );
};     
 
 var rowFunctions = (
  <div className="form-inline">
    {TriggerAvailabilityModal("Edit")}
    <BSButton>Delete</BSButton>
  </div>
 )
 
 var addButton =  TriggerAvailabilityModal("Add New");
var headers = ["Date","Day Of Week","Start Time","Duration","Recurring?","Fonction"];
var data = [
    ["2013/10/01","Wednesday","12:00" ,"3 Hours","No",rowFunctions],
    ["2013/09/12","Friday","16:00"  ,"2 hours" ,"No",rowFunctions]
    ];   

var VolunteerAvailability = React.createClass({
  propTypes: {
  
  },

  render: function(){
   var filter = false;
    return (
      <div>
        <FilterableItemList isFiltered={filter} headers={headers} data={data} />
        {addButton}
      </div>
    );
  }
});

module.exports = VolunteerAvailability;