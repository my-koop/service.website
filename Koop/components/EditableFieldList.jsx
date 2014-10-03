var React = require("react");
var PropTypes = React.PropTypes;
var BSInput = require("react-bootstrap/Input");
var MKListModButtons = require("components/ListModButtons");
var MKFilterableItemList = require("components/FilterableItemList");
var MKCollapsiblePanel = require("components/CollapsiblePanel");

var OptionsPage = React.createClass({

  propTypes: {
    fields: PropTypes.array.isRequired
  },

  getInitialState: function(){
    return {
      fields: this.props.fields || []
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
        [ <MKListModButtons
            buttons={[
              {
                icon: "minus",
                warningMessage: "Are you sure you want to delete this ?"
              },
              {
                icon: "arrow-up",
                hide: i === 0
              },
              {
                icon: "arrow-down",
                hide: i >= (length - 1)
              },
            ]}
          />,
          option.display
        ]
      );
    });
    options.push([<MKListModButtons buttons={[{icon: "plus"}]} />, "Add a new option"]);

    return (
      <div>
        <BSInput type="text" value={field.label} onChange={labelChanged} label="label" />
        <MKFilterableItemList headers={["Actions","Option Name"]} data={options}/>
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

    var length = this.state.fields.length;
    var header = (
      <span>
        <span style={{marginRight:"15px"}}>{fieldTypeDisplay} field</span>
        <MKListModButtons
          buttons={[
            {
              icon: "plus",
            },
            {
              icon: "minus",
              warningMessage: "Are you sure you want to delete this ?",
              callback: this.deleteField.bind(null,i)
            },
            {
              icon: "arrow-up",
              hide: i === 0,
              callback: this.moveUp.bind(null,i)
            },
            {
              icon: "arrow-down",
              hide: i >= (length - 1),
              callback: this.moveDown.bind(null,i)
            },
          ]}
          stopPropagation
        />
      </span>
    );
    return (
      <MKCollapsiblePanel bsSize="small" key={i} header={header}>
        {fieldComponent}
      </MKCollapsiblePanel>
    );
  },

  deleteField: function(i, e){
    if(i < 0 || i >= this.state.fields.length) return null;

    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    this.setState({fields:fields});
  },

  moveUp: function(i, e){
    if(i <= 0) return null;

    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    fields.splice(i-1,0,elem[0]);
    this.setState({fields:fields});
  },

  moveDown: function(i, e){
    if(i < 0 || i >= this.state.fields.length-1) return null;

    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    fields.splice(i+1,0,elem[0]);
    this.setState({fields:fields});
  },

  render: function() {
    var self = this;
    var fields = this.state.fields.map(function(field,i){
      return self.makeField(field,i);
    });
    return (
      <div>
        {fields}
      </div>
    );
  }
});

module.exports = OptionsPage;
