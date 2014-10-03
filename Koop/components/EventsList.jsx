var React = require("react");
var PropTypes = React.PropTypes;
var FilteredList = require("components/FilterableItemList");
var BSButton = require("react-bootstrap/Button");
var MKEventSignupModal = require("components/EventSignupModal");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");

var eventSignupProps = {name:"Sexy and I know it",
                        date:"05/05/1989",
                        price:"5.00"};
var editButton = <BSButton>Edit</BSButton>;
var signupButton = <BSModalTrigger modal={<MKEventSignupModal infos={eventSignupProps}/>} >
                    <BSButton bsSize="small">Signup/Register</BSButton>
                   </BSModalTrigger>;

var headers = ["ID","Name","Date","Fonction", "Signup"];
var data = [
    ["1","Daily Operation","2013/10/01",editButton, signupButton],
    ["2","Mobile Clinic","2013/08/27",editButton, signupButton],
    ["3","Mobile Clinic","2013/08/19",editButton, signupButton],
    ["4","Daily Operation","2013/09/22",editButton, signupButton],
    ["5","Daily Operation","2013/09/25",editButton, signupButton],
    ["6","Daily Operation","2013/09/28",editButton, signupButton]
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