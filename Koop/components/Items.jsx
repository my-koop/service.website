var _ = require("lodash");
var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");
var MKTableSorter = require("components/TableSorter");

// TableSorter Config
var CONFIG = {
    columns: {
        col1: { name: "Col 1" },
        col2: { name: "Col 2" },
        col3: { name: "Col 3" },
        editCol: { name: "Edit", disableSort: true },
        addCol: { name: "Add", disableSort: true }
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
