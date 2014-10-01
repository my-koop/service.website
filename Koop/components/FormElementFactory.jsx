var React = require("react");
var PropTypes = React.PropTypes;
var BSInput = require("react-bootstrap/Input");

var FormElementSelect = React.createClass({
  propTypes : {
	options  : PropTypes.array.isRequired,
	label    : PropTypes.string.isRequired,
	name     : PropTypes.string.isRequired
	
  },
  //onChange : PropTypes.function
  render: function(){
	options = this.props.options.map(function(option){
		return (
			<option name={option.name}>
				{option.value}
			</option>
		);
	});
	return (
		<div>
			<BSInput type="select" label={this.props.label} name={this.props.name}>
				{options}
			</BSInput>
		</div>
	);  
  }
});

var FormElementText = React.createClass({
	propTypes: {
		label		 : PropTypes.string.isRequired,
		name		 : PropTypes.string.isRequired,
		defaultValue : PropTypes.string,
		value		 : PropTypes.string,
		placeholder  : PropTypes.string
	},
	getDefaultProps: function(){
		return {
			"label": "",
			"name": "",
			"onChange": null,
			"defaultValue": null,
			"value": null,
			"placeholder": ""
		};
	},

	render: function() {
		return (
		<div>
			<BSInput type="text"
				label={this.props.label} 
				name={this.props.name} 
				defaultValue={this.props.defaultValue} 
				placeholder={this.props.placeholder} 
				value={this.props.value} />
		</div>
		)
	}
});

var FormElementRadioGroup = React.createClass({
  propTypes : {
	values   : PropTypes.array.isRequired,
	label    : PropTypes.string.isRequired,
	name     : PropTypes.string.isRequired
  },
  render: function(){
	var name = this.props.name;
	var group = this.props.values.map(function(radio){
		return (
			<BSInput type="radio" label={radio.label} name={name} value={radio.value} />
					
		);
	});
	return (
		<div className="form-inline">
			{group}
		</div>
	);  
  }
});

var FormElementCheckbox = React.createClass({
  propTypes : {
	label     : PropTypes.string.isRequired,
	name      : PropTypes.string.isRequired,
	isChecked : PropTypes.bool
  },
  //onChange  : PropTypes.function,
  render: function(){
	return (
		<div>
			 <BSInput type="checkbox" label={this.props.label} name={this.props.name} selected={this.props.isChecked} onChange={this.props.function} />
		</div>
	);  
  }
});

var FormElementFactory = React.createClass({
	propTypes : {
		type	   : PropTypes.string.isRequired,
		properties : PropTypes.object.isRequired
	},
	render: function(){
		var element;
		//Ajouter la gestion de fonction de changement
		//onChange	 ={this.props.properties.onChange}
		switch(this.props.type) {
			case "select": element = <FormElementSelect 
										label   ={this.props.properties.label}
										name    ={this.props.properties.name}
										onChange={this.props.properties.onChange}
										options ={this.props.properties.options} />
						   break;
			case "text": element = <FormElementText 
										label		 ={this.props.properties.label}
										name		 ={this.props.properties.name}
										defaultValue ={this.props.properties.defaultValue}
										value		 ={this.props.properties.value}
										placeholder  ={this.props.properties.placeholder} />
						  break;
			case "radio": element = <FormElementRadioGroup 
										label	 ={this.props.properties.label}
										name	 ={this.props.properties.name}
										values	 ={this.props.properties.values} />
						  break;
			case "checkbox" : element = <FormElementCheckbox
											label	 ={this.props.properties.label}
											name	 ={this.props.properties.name}
											onChange ={this.props.properties.onChange}
											isChecked={this.props.properties.isChecked}  />
							  break;
			default: break;									
		};
		return (
			<div>
				{element}
			</div>
		);
	}
	
});


module.exports = FormElementFactory ;
