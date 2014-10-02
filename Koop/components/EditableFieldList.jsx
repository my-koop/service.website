var React = require("react");
var PropTypes = React.PropTypes;
var BSInput = require("react-bootstrap/Input");
var BSPanel = require("react-bootstrap/Panel");
var BSGlyphicon = require("react-bootstrap/Glyphicon");
var MKListModButtons = require("components/ListModButtons");
var MKFilterableItemList = require("components/FilterableItemList");

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
              hideUp={i === 0}
              hideDown={i >= (length - 1)}
              hidePlus
              warningMessage="Are you sure you want to delete this ?"
            />,
          option.display
        ]
      );
    });
    options.push([<MKListModButtons hideUp hideDown hideMinus />, "Add a new option"]);

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
    var expanded = !!this.state.fields[i].expanded;
    var glyph = expanded ? "minus" : "plus";
    var title = (
      <div>
        <BSGlyphicon glyph={glyph} />
        <span style={{marginRight:"15px"}}>{fieldTypeDisplay} field</span>
        <MKListModButtons
            hideUp={i === 0}
            hideDown={i >= (this.state.fields.length - 1)}
            callBackMinus={this.deleteField.bind(null,i)}
            callBackUp={this.moveUp.bind(null,i)}
            callBackDown={this.moveDown.bind(null,i)}
            warningMessage="Are you sure you want to delete this ?"
          />
      </div>
    );
    return (
      <BSPanel bsSize="small" key={i} collapsable expanded={expanded} header={title} onSelect={this.toggleField.bind(null,i)}>
        {fieldComponent}
      </BSPanel>
    );
  },

  toggleField: function(i, e, e2){
    if(i < 0 || i >= this.state.fields.length) return null;

    var fields = this.state.fields;
    fields[i].expanded = !fields[i].expanded;
    this.setState({fields:fields});

  },

  deleteField: function(i, e){
    if(i < 0 || i >= this.state.fields.length) return null;
    e.stopPropagation();

    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    this.setState({fields:fields});
  },

  moveUp: function(i, e){
    if(i <= 0) return null;
    e.stopPropagation();
    var fields = this.state.fields;
    var elem = fields.splice(i,1);
    fields.splice(i-1,0,elem[0]);
    this.setState({fields:fields});
  },

  moveDown: function(i, e){
    if(i < 0 || i >= this.state.fields.length-1) return null;
    e.stopPropagation();

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
