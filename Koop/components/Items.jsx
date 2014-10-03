var React           = require("react");
var BSCol           = require("react-bootstrap/Col");
var BSInput         = require("react-bootstrap/Input");
var BSButton        = require("react-bootstrap/Button");
var BSModalTrigger  = require("react-bootstrap/ModalTrigger");
var MKIcon          = require("components/Icon");

var MKTableSorter   = require("components/TableSorter");
var MKListModButtons= require("components/ListModButtons");
var MKItemEditModal = require("components/ItemEditModal");



var Items = React.createClass({
  render: function() {
    // TableSorter Config
    var CONFIG = {
        columns: {
          id: { name: "ID" },
          col1: { name: "Code" },
          col2: { name: "Quantity" },
          col3: { name: "Name" },
          editCol: {
            name: "Actions",
            disableSort: true,
            disableFilter: true,
            cellGenerator: function(item, i){
              var self = this;
              return (
                <td key={i}>
                  <MKListModButtons
                    buttons={[
                      {
                        icon:"plus",
                        tooltip:{
                          text: "Increase quantity",
                          placement: "left"
                        }
                      },
                      {
                        icon:"minus",
                        warningMessage: "Are you sure?",
                        tooltip:{
                          text: "Delete"
                        },
                        callback: function(){
                          alert("You deleted the item, or did you?");
                        }
                      },
                      {
                        icon:"edit",
                        tooltip:{
                          text: "Edit Item",
                          placement: "right"
                        },
                        customWrapper: function(component, iBtn){
                          return (
                            <BSModalTrigger key={iBtn} modal={<MKItemEditModal name={item["col3"]} itemId={item["id"]}/> } >
                              {component}
                            </BSModalTrigger>
                          );
                        }
                      },
                    ]
                  }
                />
              </td>
            );
          }
        }
      }
    };

    return (
      <BSCol md={12}>
        <div>
          <MKTableSorter config={CONFIG} headerRepeat={8} striped bordered condensed hover/>
        </div>
      </BSCol>
    );
  }
});

module.exports = Items;
