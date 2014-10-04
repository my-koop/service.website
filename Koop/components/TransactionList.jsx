var React           = require("react");
var PropTypes       = React.PropTypes;
var BSButton        = require("react-bootstrap/Button");
var BSCol           = require("react-bootstrap/Col");
var BSModalTrigger  = require("react-bootstrap/ModalTrigger");

var MKTableSorter   = require("components/TableSorter");
var MKListModButtons= require("components/ListModButtons");
var MKItemEditModal = require("components/ItemEditModal");
var FormInputFactory= require("components/FormInputFactory");
var MKAbstractModal = require("components/AbstractModal");


var actionsGenerator = function(item){
  return [
    {
      icon: "minus",
      warningMessage: "Are you sure?",
      tooltip: {
        text: "Delete",
        overlayProps: {
          placement: "top"
        }
      }
    },
    {
      icon: "edit",
      tooltip: {
        text: "Edit Item",
        overlayProps: {
          placement: "right"
        }
      }
    },
  ];
}

var TransactionList = React.createClass({
  getInitialState: function(){
    return {
      items:  [
        {
          "id": "1",
          "col1": "Tylioq",
          "col2": "2013/09/22",
          "col3": "2",
          "col4": "23.45$",
          "col5": "10.00$",
          "col6": "Open"
        },
        {
          "id": "2",
          "col1": "Carabeche",
          "col2": "2013/09/22",
          "col3": "1",
          "col4": "2.25$",
          "col5": "2.25$",
          "col6": "Closed"
        },
        {
          "id": "3",
          "col1": "Grabioe",
          "col2": "2013/09/22",
          "col3": "6",
          "col4": "67.45$",
          "col5": "67.45$",
          "col6": "Closed"
        }
      ]
    }
  },
  render: function(){
  
    var CONFIG = {
      columns: {
        id: { name: "ID" },
        col1: { name: "Username" },
        col2: { name: "Date" },
        col3: { name: "#Items" },
        col4: { name: "Total Price" },
        col5: { name: "Total Paid" },
        col6: { name: "Status" },
        editCol: {
          name: "Actions",
          disableSort: true,
          disableFilter: true,
          cellGenerator: function(item){
            var self = this;
            return (
              <MKListModButtons
                defaultTooltipDelay={500}
                buttons={actionsGenerator.call(this,item)}
              />
            );
          }
        }
      }
    };
    return (
      <BSCol md={12}>
      <div>
        <MKTableSorter
          config={CONFIG}
          items={this.state.items}
          headerRepeat={8}
          striped
          bordered
          condensed
          hover
        />
      </div>
    </BSCol>
    );
  }
});

module.exports = TransactionList;