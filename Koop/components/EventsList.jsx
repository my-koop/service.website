var React = require("react");
var PropTypes = React.PropTypes;
var FilteredList = require("components/FilterableItemList");
var BSButton = require("react-bootstrap/Button");

var editButton = <BSButton>Edit</BSButton>;

var headers = ["ID","Name","Date","Fonction"];
var data = [
    ["1","Ouverture Coop","2013/10/01",editButton],
    ["2","Mobile Clinic","2013/08/27",editButton],
    ["3","Mobile Clinic","2013/08/19",editButton]
    ];
var filters = [
    {
      "properties": {
        "name": "search",
        "placeholder": "search",
        "label": "Search by ID"
      },
     "type": "text"
    }
];
var EventsList = React.createClass({
    render: function(){
      var filter = true;
      return (
        <FilteredList isFiltered={filter} filterOptions={filters} headers={headers} data={data} />
      );
    }
});

module.exports = EventsList;