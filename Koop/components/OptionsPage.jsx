var React = require("react");
var BSRow = require("react-bootstrap/Row");
var BSCol = require("react-bootstrap/Col");
var BSPanel = require("react-bootstrap/Panel");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSPanel = require("react-bootstrap/Panel");
var BSTable = require("react-bootstrap/Table");
var MKConfirmationTrigger = require("components/ConfirmationTrigger");
var MKListModButtons = require("components/ListModButtons");

var OptionsPage = React.createClass({

  getInitialState: function(){
    return {
      fields: [
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
      ],
    };
  },

  makeNumberField: function(field, i){
    var self = this;
    var labelChanged = function(e){
      var name = e.target.value;
      var state = self.state;
      state.fields[i].label = name;
      self.setState(state);
    };
    return (<BSInput type="text" value={field.label} onChange={labelChanged} label="label" />);
  },

  makeSelectField: function(field, i){
    var self = this;
    var labelChanged = function(e){
      var name = e.target.value;
      var state = self.state;
      state.fields[i].label = name;
      self.setState(state);
    };
    var length = field.options.length;
    var options = field.options.map(function(option,i){
      return (
        <tr>

          <td>
            <MKListModButtons
              hideUp={i === 0}
              hideDown={i >= (length - 1)}
              hidePlus
              warningMessage="Are you sure you want to delete this ?"
            />
          </td>
          <td>
            {option.display}
          </td>
        </tr>
      );
    });
    return (
      <div>
        <BSInput type="text" value={field.label} onChange={labelChanged} label="label" />
        <BSTable hover>
          <thead>
            <tr>
              <td style={{width:"10%", minWidth:"120px"}}>Actions</td>
              <td>Option Name</td>
            </tr>
          </thead>
          <tbody>
            {options}
            <tr>
              <td>
                <MKListModButtons hideUp hideDown hideMinus />
              </td>
              <td>
                Add a new option
              </td>
            </tr>
          </tbody>
        </BSTable>
      </div>
    );
  },

  makeTextField: function(field, i){
    var self = this;
    var labelChanged = function(e){
      var name = e.target.value;
      var state = self.state;
      state.fields[i].label = name;
      self.setState(state);
    };
    var descriptionChanged = function(e){
      var name = e.target.value;
      var state = self.state;
      state.fields[i].description = name;
      self.setState(state);
    };

    return (
      <div>
        <BSInput type="text" value={field.label} onChange={labelChanged} label="label" />
        <BSInput type="text" value={field.description} onChange={descriptionChanged} label="description" />
      </div>
    );
  },

  makeField: function(field,i){
    if(!field) return null;

    var fieldComponent;
    var fieldTypeDisplay;

    switch(field.type){
    case "number":
      fieldComponent = this.makeNumberField(field, i);
      fieldTypeDisplay = "Number";
      break;
    case "select":
      fieldTypeDisplay = "Multiple Options";
      fieldComponent = this.makeSelectField(field, i);
      break;
    case "text":
      fieldTypeDisplay = "Text";
      fieldComponent = this.makeTextField(field, i);
      break;
    default:
      return null;
    }

    return (
      <BSPanel bsSize="small" key={i}>
        <div className="modal-header">
          <div>{fieldTypeDisplay} field</div>
          <MKListModButtons
            hideUp={i === 0}
            hideDown={i >= (this.state.fields.length - 1)}
            callBackMinus={this.deleteField.bind(null,i)}
            callBackUp={this.moveUp.bind(null,i)}
            callBackDown={this.moveDown.bind(null,i)}
            warningMessage="Are you sure you want to delete this ?"
          />

        </div>
        <div className="modal-body" >
          {fieldComponent}
        </div>
      </BSPanel>
    );
  },

  deleteField: function(i, e){
    if(i < 0 || i >= this.state.fields.length) return null;

    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    this.setState({fields:fields}, function(){
      console.log(this.state.fields);
    });
  },

  moveUp: function(i, e){
    if(i <= 0) return null;
    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    fields.splice(i-1,0,elem[0]);
    this.setState({fields:fields}, function(){
      console.log(this.state.fields);
    });
  },

  moveDown: function(i, e){
    if(i < 0 || i >= this.state.fields.length-1) return null;

    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    fields.splice(i+1,0,elem[0]);
    this.setState({fields:fields}, function(){
      console.log(this.state.fields);
    });
  },

  render: function() {
    var self = this;
    var fields = this.state.fields.map(function(field,i){
      return self.makeField(field,i);
    });
    return (
      <BSCol md={12}>
        <BSPanel header="User optional fields">
          {fields}
        </BSPanel>
      </BSCol>
    );
  }
});

module.exports = OptionsPage;
