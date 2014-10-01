var React = require("react");
var PropTypes = React.PropTypes;
var FilteredList = require("components/FilterableItemList");
var BSButton = require("react-bootstrap/Button");

var button = <BSButton>Edit </BSButton>;

var headers = ["ID","Username","Name","UseBike","Fonction"];
var data = [
	["1","AS","Adam","Yes",button],
	["2","ML","Moe","No",button],
	["3","HS","Homer","No",button]
	];
var filters = [
	{
	  "properties": {
		"name": "search",
		"placeholder": "search",
		"label": "search"
	  },
	 "type": "text"
	},
	{
  "properties": {
    "name": "Dropdown",
    "label": "Dropdown",
    "options": [
      {
        "name": "Option1",
        "value": "Option1"
      },
      {
        "name": "Option2",
        "value": "Option2"
      },
      {
        "name": "Option3",
        "value": "Option3"
      }
    ]
  },
  "type": "select"
},

{
  "properties": {
    "name": "Groupe Radio",
    "label": "Groupe Radio",
    "values": [
      {
        "label": "Choix 1",
        "value": "c1"
      },
      {
        "label": "Choix2",
        "value": "c2"
      },
      {
        "label": "Choix3",
        "value": "c3"
      }
    ]
  },
  "type": "radio"
},
{
  "properties": {
    "name": "Checkbox",
    "label": "Checkbox",
	"isChecked": true
  },
  "type": "checkbox"
}

];
var TestList = React.createClass({
	render: function(){
		var filter = true;
		return (
			<FilteredList isFiltered={filter} filterOptions={filters} headers={headers} data={data} />
		);

	}
});

module.exports = TestList;