var React = require("react");
var PropTypes = React.PropTypes;
var FilteredList = require("components/FilterableItemList");
var BSButton = require("react-bootstrap/Button");
var BSButtonGroup = require("react-bootstrap/ButtonGroup");

var editButton = <BSButton>Edit </BSButton>;
var viewButton = <BSButton>View </BSButton>;
var functions = <BSButtonGroup>
                  {editButton}
                  {viewButton}
                </BSButtonGroup>

var headers = ["ID","Username","Date","#items","Total Price","Total Paid","Status","Functions"];
var data = [
    ["1","AS","2013/09/27","6","49.56$","49.56$","Closed",functions],
    ["2","Fraco68","2013/09/27","2","2.95$","0.67$","Open",functions],
    ["3","Pablo","2013/09/26","1","25.00$","25.00$","Closed",functions]
    ];
var filters = [
    {
      "properties": {
        "name": "search_id",
        "placeholder": "search by id",
        "label": "Search"
      },
     "type": "text"
    },
    {
  "properties": {
    "name": "status",
    "label": "Status",
    "options": [
      {
        "name": "open",
        "value": "Open Transactions"
      },
      {
        "name": "closed",
        "value": "Closed Transactions"
      },
    ]
  },
  "type": "select"
}

];
var TransactionList = React.createClass({
    render: function(){
      var filter = true;
      return (
        <FilteredList isFiltered={filter} filterOptions={filters} headers={headers} data={data} />
      );
    }
});

module.exports = TransactionList;