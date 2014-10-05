var React     = require("react");
var PropTypes = React.PropTypes;
var BSInput   = require("react-bootstrap/Input");
var BSTable   = require("react-bootstrap/Table");
var BSButton  = require("react-bootstrap/Button");
var MKIcon    = require("components/Icon");

var _         = require("lodash");

// Inequality function map for the filtering
var operators = {
    "<": function(x, y) { return x < y; },
    "<=": function(x, y) { return x <= y; },
    ">": function(x, y) { return x > y; },
    ">=": function(x, y) { return x >= y; },
    "=": function(x, y) { return x == y; }
};
var operandRegex = /^((?:(?:[<>]=?)|==))\s?([-]?\d+(?:\.\d+)?)$/;

// TableSorter React Component
var TableSorter = React.createClass({

  propTypes: {
    config: PropTypes.shape({
      sort: PropTypes.shape({
        colomn: PropTypes.string.isRequired,
        order: PropTypes.oneOf(["asc","desc"]).isRequired,
      }),

      columns: PropTypes.objectOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        defaultSortOrder: PropTypes.oneOf(["asc","desc",""]),
        // default filter text
        filterText: PropTypes.string,
        // callback to create a custom cell content
        // function(item: Data, colIndex: number) : ReactComponent
        cellGenerator: PropTypes.func,
        // Disable Sorting for this column only
        disableSort: PropTypes.bool,
        // Disable Filtering for this column only
        disableFilter: PropTypes.bool,
      })).isRequired,
      // Default column ordering, if not specified
      // use Object.keys()
      defaultOrdering: PropTypes.array,
    }).isRequired,

    // Initial data in the table
    items: PropTypes.array,
    // Header repeat interval, 0 to disable
    headerRepeat: PropTypes.number,
    // Disable Sorting for this table
    disableSort: PropTypes.bool,
    // Disable Filtering for this table
    disableFilter: PropTypes.bool,
  },

  getInitialState: function() {
    return {
      sort: this.props.config.sort || { column: "", order: "" },
      columns: this.props.config.columns,
      columnsOrder: this.props.config.defaultOrdering || Object.keys(this.props.config.columns)
    };
  },

  handleFilterTextChange: function(column) {
    var self = this;
    return function(newValue) {
      var obj = self.state.columns;
      obj[column].filterText = newValue;
      self.setState({columns:obj});
    };
  },

  getColumnNames: function() {
    return this.state.columnsOrder;
  },

  sortColumn: function(column) {
    var self = this;
    return function(event) {
      var newSortOrder
      if (self.state.sort.column !== column) {
        newSortOrder = self.state.columns[column].defaultSortOrder || "asc";
      } else {
        newSortOrder = (self.state.sort.order === "asc") ? "desc" : "asc";
      }

      self.setState({sort: { column: column, order: newSortOrder }});
    };
  },

  columnChangeEvent: "column change",

  dragStart: function(i, e){
    var data = {
      index : i,
      event: this.columnChangeEvent
    }
    e.dataTransfer.setData("text", JSON.stringify(data));
  },

  onDrop: function(i, e){
    var data = JSON.parse(e.dataTransfer.getData("text"));
    if(
      data.event === this.columnChangeEvent &&
      _.isNumber(data.index) &&
      (data.index >>> 0) < this.state.columnsOrder.length &&
      data.index !== i
    ){
      var columnsOrder = this.state.columnsOrder;
      var draggedColumn = columnsOrder.splice(data.index, 1);
      columnsOrder.splice(i, 0, draggedColumn);
      this.setState({
        columnsOrder: columnsOrder
      });
    }
  },

  render: function() {
    var self = this;
    var allRows = [];

    var columnNames = self.getColumnNames();
    var filters = {};

    /////////////////////////////////////////////////////////////////////////
    // Apply filters
    columnNames.forEach(function(column) {
      var filterText = self.state.columns[column].filterText;
      filters[column] = null;

      if (filterText && filterText.length > 0) {
        operandMatch = operandRegex.exec(filterText);
        if (operandMatch && (operandMatch.length === 3) ) {
          filters[column] = function(match) { return function(x) { return operators[match[1]](x, match[2]); }; }(operandMatch);
        } else {
          filters[column] = function(x) {
            return ~(x.toString().toLowerCase().indexOf(filterText.toLowerCase()));
          };
        }
      }
    });

    var filteredItems = _.filter(self.props.items, function(item) {
      return _.every(columnNames, function(c) {
        return (!filters[c] || filters[c](item[c]));
      });
    });
    /////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////
    // Sort data
    if(!self.props.disableSort){
      var sortedItems = _.sortBy(filteredItems, self.state.sort.column);
      if (self.state.sort.order === "desc")
        sortedItems.reverse();
    } else {
      var sortedItems = filteredItems;
    }
    /////////////////////////////////////////////////////////////////////////

    // Create headers
    var header = columnNames.map(function(c, i) {
      var doSort = !self.props.disableSort && !self.state.columns[c].disableSort;
      var dragProps = {
        draggable: true,
        onDragStart: self.dragStart.bind(null,i),
        onDrop: self.onDrop.bind(null,i),
        onDragOver: function(e){e.preventDefault();},
      };

      if(doSort){
        var iconName = "sort";
        var isSortingThisColumn = self.state.sort.column === c;
        if(isSortingThisColumn){
          iconName += "-" + self.state.sort.order;
        }
        var icon = (<MKIcon glyph={iconName} />);

        return (
          <th key={i}>
            <div {...dragProps}>
              <BSButton onClick={self.sortColumn(c)} bsStyle="link">
                {self.state.columns[c].name} {icon}
              </BSButton>
            </div>
          </th>
        );
      }
      return (
        <th key={i}>
          <div {...dragProps}>
            <span className="btn btn-link" disabled>
              {self.state.columns[c].name}
            </span>
          </div>
        </th>
      );
    });

    // Create filter fields
    if(!self.props.disableFilter){
      var filterLink = function(column) {
        return {
          value: self.state.columns[column].filterText,
          requestChange: self.handleFilterTextChange(column)
        };
      };

      var filterInputs = columnNames.map(function(c, i) {
        if(!self.state.columns[c].disableFilter){
          return <td key={i}><BSInput type="text" valueLink={filterLink(c)} placeholder={"Filter by " + self.state.columns[c].name} /></td>;
        }
        return <td key={i} />;
      });
    }

    // Extra header generator
    var headerExtra = function() {
      return columnNames.map(function(c, i) {
        return <th key={i}>{self.state.columns[c].name}</th>;
      }, self);
    };

    // Row generator
    var rowGenerator = function(item) {
      return columnNames.map(function(colName, i) {
        var cellGenerator = self.state.columns[colName].cellGenerator;

        if(cellGenerator){
          return (
            <td key={i}>
              {cellGenerator.call(self,item)}
            </td>
          );
        } else {
          return (
            <td key={i}>
              {item[colName]}
            </td>
          );
        }
      });
    };

    // Create all rows
    sortedItems.forEach(function(item, i) {
      if ((self.props.headerRepeat > 0) && (i > 0) && (i % self.props.headerRepeat === 0)) {
        allRows.push (
          <tr key={"extra" + i}>
            {headerExtra()}
          </tr>
        )
      }

      allRows.push(
        <tr key={i}>
          {rowGenerator(item)}
        </tr>
      );
    });



    return (
      <BSTable
        className="table-sorter"
        cellSpacing="0"
        striped  ={this.props.striped}
        bordered ={this.props.bordered}
        condensed={this.props.condensed}
        hover    ={this.props.hover}
      >
        <thead>
          <tr>
            {header}
          </tr>
          {!self.props.disableFilter ? (
            <tr className="table-sorter-filter-row">
              {filterInputs}
            </tr>
          ) : null }
        </thead>
        <tbody>
          {allRows}
        </tbody>
      </BSTable>
    );
  }
});

module.exports = TableSorter;
