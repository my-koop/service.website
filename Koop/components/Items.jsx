var React = require("react");
var BSCol = require("react-bootstrap/Col");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");
var MKIcon               = require("components/icon");

var MKTableSorter = require("components/TableSorter");
var MKListModButtons = require("components/ListModButtons");
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
                    <MKListModButtons buttons={[
                      {icon:"plus"},
                    ]} />
                    <BSModalTrigger modal={<MKItemEditModal name={item["col3"]} itemId={item["id"]}/>}>
                      <BSButton bsSize="small">
                        <MKIcon glyph="edit" />
                      </BSButton>
                    </BSModalTrigger>
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
