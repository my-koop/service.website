var React = require("react");
var BSCol = require("react-bootstrap/Col");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");

var MKTableSorter = require("components/TableSorter");
var MKListModButtons = require("components/ListModButtons");

// TableSorter Config
var CONFIG = {
    columns: {
        id: { name: "ID" },
        col1: { name: "Code" },
        col2: { name: "Quantity" },
        col3: { name: "Supplier" },
        editCol: {
          name: "Actions",
          disableSort: true,
          disableFilter: true,
          cellGenerator: function(item, i){
            return (
              <td key={i}>
                <MKListModButtons buttons={[{icon:"plus"}]} />
              </td>
            );
          }
        }
    }
};

var Items = React.createClass({
  render: function() {
      return (
        <BSCol md={12}>
          <div>
            <MKTableSorter config={CONFIG} headerRepeat={8} />
          </div>
        </BSCol>
      );
}
});

module.exports = Items;
