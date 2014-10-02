var React = require("react");
var PropTypes = React.PropTypes;
var BSInput = require("react-bootstrap/Input");



 generateSelectInput = function(properties,key)
 {
   options = properties.options.map(function(option,key){
     return (
       <option key={key} name={option.name}>
         {option.value}
       </option>
      );
    });
    return (
      <BSInput type="select" key={key} label={properties.label} name={properties.name}>
        {options}
      </BSInput>
    );       
 }
    
 generateTextInput = function(properties,key){
   return (
     <BSInput 
       type        ="text"
       key         ={key}
       label       ={properties.label} 
       name        ={properties.name} 
       defaultValue={properties.defaultValue} 
       placeholder ={properties.placeholder} 
       value       ={properties.value} />
   );
 }

 generateRadioInputGroup = function(properties,key){
    var name = properties.name;
    var group = properties.values.map(function(radio,key){
      return (
        <BSInput type="radio" key={key} label={radio.label} name={name} value={radio.value} />            
      );
    });
    return (
      <div className="form-inline" key={key}>
        {group}
      </div>
    );
 }

 generateCheckboxInput = function(properties,key){
    return (
       <div>
        <BSInput 
          key     ={key}
          type    ="checkbox" 
          label   ={properties.label} 
          name    ={properties.name} 
          selected={properties.isChecked} 
          onChange={properties.function} />
      </div>
    );
 }
     
  InputFactoryMethod = function(type,properties,key){
    var element;
      switch(type) {
        case "select": element = generateSelectInput(properties,key);
                        break;
        case "text":   element = generateTextInput(properties,key);
                        break;
        case "radio":  element = generateRadioInputGroup(properties,key);
                        break;
        case "checkbox" : element = generateCheckboxInput(properties,key);
                          break;
        default: break;
      };
      return (
        <div>
            {element}
        </div>
      );
  }


module.exports = InputFactoryMethod ;
