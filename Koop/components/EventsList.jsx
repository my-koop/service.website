var React           = require("react");
var PropTypes       = React.PropTypes;
var BSButton        = require("react-bootstrap/Button");
var BSCol           = require("react-bootstrap/Col");
var BSModalTrigger  = require("react-bootstrap/ModalTrigger");
var MKEventSignupModal = require("components/EventSignupModal");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");

var MKTableSorter   = require("components/TableSorter");
var MKListModButtons= require("components/ListModButtons");
var MKItemEditModal = require("components/ItemEditModal");
var FormInputFactory= require("components/FormInputFactory");
var MKAbstractModal = require("components/AbstractModal");

var eventSignupProps = {
  name:"Sexy and I know it",
  date:"05/05/1989",
  price:"5.00" //Fix me. Or throw me. Do whatever you want to me ;) 
};

var editButton = <BSButton>Edit</BSButton>;
var signupButton = <BSModalTrigger modal={<MKEventSignupModal infos={eventSignupProps}/>} >
                    <BSButton bsSize="small">Signup/Register</BSButton>
                   </BSModalTrigger>;


var EventBoxInputs  = [
  {
    "properties": {
      "name": "eventType",
      "label": "Select event type",
      "options": [
        {
          "name": "eventType_Daily",
          "value": "Daily Operation"
        },
        {
          "name": "eventType_MobileClinic",
          "value": "Mobile Clinic"
        }
      ]
    },
    "type": "select"
  },
  {
    "properties": {
      "name": "date",
      "label": "Date",
      "placeholder": "YYYY/MM/DD"
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
  }
];

var EventBox = React.createClass({
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
      <EventBox inputs={EventBoxInputs} />
      <BSButton bsStyle="primary" type="submit">Confirm</BSButton>
  </div>
);

var TriggerEventModal = function(buttonName){
  return (
    <div>
      <BSModalTrigger modal={
        <MKAbstractModal 
          title="Create new event" 
          modalBody={modalBody} 
          useCloseButtonFooter
        />
        } 
      >
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
            modal={
              <MKAbstractModal 
                title="Edit Event" 
                modalBody={modalBody} 
                useCloseButtonFooter 
              /> }
          >
            {component}
          </BSModalTrigger>
        );
      }

    },
  ];
}

var EventsList = React.createClass({
  getInitialState: function(){
    return {
      items:  [
        {
          "id": 1,
          "col1": "Daily Operation",
          "col2": "2013/10/01",
          "col3": "12:00"
        },
        {
          "id": 2,
          "col1": "Daily Operation",
          "col2": "2013/09/25",
          "col3": "16:00"
        },
        {
          "id": 3,
          "col1": "Mobile Clinic",
          "col2": "2013/09/24",
          "col3": "18:00"
        },
        {
          "id": 4,
          "col1": "Daily Operation",
          "col2": "2013/09/24",
          "col3": "16:00"
        },
        {
          "id": "5",
          "col1": "Daily Operation",
          "col2": "2013/09/22",
          "col3": "18:00"
        }
      ]
    }
  },
  render: function(){
    var CONFIG = {
      columns: {
        id: { name: "ID" },
        col1: { name: "Event Type" },
        col2: { name: "Date" },
        col3: { name: "Start Time" },
        editCol: {
          name: "Actions",
          isStatic: true,
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
    return (
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
        {TriggerEventModal("Add New")}
      </div>
    </BSCol>
    );
  }
});

module.exports = EventsList;