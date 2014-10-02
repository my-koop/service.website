var _ = require("lodash");
var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");
var MKTableSorter = require("components/TableSorter");

// TableSorter Config
var CONFIG = {
    sort: { column: "col2", order: "desc" },
    columns: {
        col1: { name: "Col 1", filterText: "", defaultSortOrder: "desc"},
        col2: { name: "Col 2", filterText: "", defaultSortOrder: "desc"},
        col3: { name: "Col 3", filterText: "", defaultSortOrder: "desc"},
        editCol: { name: "Edit", filterText: "", defaultSortOrder: "none"},
        addCol: { name: "Add", filterText: "", defaultSortOrder: "none"}
    }
};

var Items = React.createClass({
  render: function() {
      return (
          <BSCol md={12}>
              <div>
                  <MKTableSorter config={CONFIG} headerRepeat="8" />
             </div>
          </BSCol>
      );
}
});

module.exports = Items;