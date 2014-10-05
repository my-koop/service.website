var React = require("react");
var PropTypes = React.PropTypes;
var FilteredList = require("components/FilterableItemList");
var BSButton = require("react-bootstrap/Button");
var MKEventSignupModal = require("components/EventSignupModal");
var MKEventReportModal = require("components/EventReportModal");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");

var eventSignupProps = {
  name:"Sexy and I know it",
  date:"05/05/1989",
  price:"5.00" //Fix me. Or throw me. Do whatever you want to me ;) 
};

var eventReportProps = {
  name:"Sexy and I know it",
  date:"05/05/1989",
  price:"5.00", //Fix me. Or throw me. Do whatever you want to me ;) 
  startTime: "19h00",
  endTime: "21h00",
  givenBy: "Jean Dujardins",
  numberRegistered: 6,
  numberAttendies: 5,
  totalSales: "10.00"
};

var editButton = <BSButton>Edit</BSButton>;
var signupButton = <BSModalTrigger modal={<MKEventSignupModal infos={eventSignupProps}/>} >
                    <BSButton bsSize="small">Signup/Register</BSButton>
                   </BSModalTrigger>;
var reportButton = <BSModalTrigger modal={<MKEventReportModal infos={eventReportProps}/>} >
                    <BSButton bsSize="small">Report</BSButton>
                   </BSModalTrigger>;

var headers = ["ID","Name","Date","Fonction", "Signup", "Report"];

var data = [
    ["1","Daily Operation","2013/10/01",editButton, signupButton, reportButton],
    ["2","Mobile Clinic","2013/08/27",editButton, signupButton, reportButton],
    ["3","Mobile Clinic","2013/08/19",editButton, signupButton, reportButton],
    ["4","Daily Operation","2013/09/22",editButton, signupButton, reportButton],
    ["5","Daily Operation","2013/09/25",editButton, signupButton, reportButton],
    ["6","Daily Operation","2013/09/28",editButton, signupButton, reportButton]
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
      return (
        <FilteredList filterOptions={filters} headers={headers} data={data} />
      );
    }
});

module.exports = EventsList;