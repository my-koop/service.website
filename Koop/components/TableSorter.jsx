var React    = require("react");
var PropTypes= React.PropTypes;

var BSTable  = require("react-bootstrap/Table");
var BSButton = require("react-bootstrap/Button");

var MKIcon   = require("components/Icon");

var _        = require("lodash");
var ajax     = require("ajax");
var routeInfo= require("routeInformation");

// Inequality function map for the filtering
var operators = {
    "<": function(x, y) { return x < y; },
    "<=": function(x, y) { return x <= y; },
    ">": function(x, y) { return x > y; },
    ">=": function(x, y) { return x >= y; },
    "=": function(x, y) { return x == y; }
};

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
        defaultSortOrder: PropTypes.oneOf(["asc","desc","none"]),
        // default filter text
        filterText: PropTypes.string,
        // callback to create a custom cell content
        // function(item: Data, colIndex: number) : ReactComponent
        cellGenerator: PropTypes.func,
        // Disable Sort for this column only
        disableSort: PropTypes.bool,
        // Disable Filter for this column only
        disableFilter: PropTypes.bool,
      })).isRequired
    }),

    // Initial date in the table
    initialItems: PropTypes.array,
    // Header repeat interval, 0 to disable
    headerRepeat: PropTypes.number,
    // Disable Sort for this table
    disableSort: PropTypes.bool,
    // Disable Filter for this table
    disableFilter: PropTypes.bool,
  },

  getInitialState: function() {
    return {
      items: this.props.initialItems || [],
      sort: this.props.config.sort || { column: "", order: "" },
      columns: this.props.config.columns
    };
  },

  componentWillMount: function() {
    var self = this;
    var itemsData = ajax.request(
      {endpoint: routeInfo.itemsData.fullPath},
      function(err, res){
        if (err) {
          console.error(routeInfo.itemsData.fullPath, status, err.toString());
          return;
        }
        // use res object
        self.setState({items:res.body});
      }
    );
  },

  handleFilterTextChange: function(column) {
    var self = this;
    return function(newValue) {
      var obj = this.state.columns;
      obj[column].filterText = newValue;

      // Since we have already mutated the state, just call forceUpdate().
      // Ideally we'd copy and setState or use an immutable data structure.
      self.forceUpdate();
    };
  },

  columnNames: function() {
    return Object.keys(this.state.columns);
  },

  sortColumn: function(column) {
    var self = this;
    return function(event) {
      var newSortOrder = (self.state.sort.order === "asc") ? "desc" : "asc";

      if (self.state.sort.column != column) {
        newSortOrder = self.state.columns[column].defaultSortOrder || "asc";
      }

      self.setState({sort: { column: column, order: newSortOrder }});
    };
  },

  render: function() {
    var self = this;
    var allRows = [];

    var columnNames = self.columnNames();
    var filters = {};

    var operandRegex = /^((?:(?:[<>]=?)|==))\s?([-]?\d+(?:\.\d+)?)$/;

    /////////////////////////////////////////////////////////////////////////
    // Apply filters
    columnNames.forEach(function(column) {
      var filterText = self.state.columns[column].filterText;
      filters[column] = null;

      if (filterText && filterText.length > 0) {
        operandMatch = operandRegex.exec(filterText);
        if (operandMatch && (operandMatch.length == 3) ) {
          filters[column] = function(match) { return function(x) { return operators[match[1]](x, match[2]); }; }(operandMatch);
        } else {
          filters[column] = function(x) {
            return (x.toString().toLowerCase().indexOf(filterText.toLowerCase()) > -1);
          };
        }
      }
    });

    var filteredItems = _.filter(self.state.items, function(item) {
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
      if( doSort ){
        var iconName = self.state.sort.column === c ? self.state.sort.order == "asc" ? "sort-asc" : "sort-desc" : "sort";
        var icon = ( <MKIcon glyph={iconName} /> );

        return (
          <th
            key={i}
          >
            <BSButton onClick={self.sortColumn(c)} bsStyle="link">
              {self.state.columns[c].name} {icon}
            </BSButton>
          </th>
        );
      }
      return (
        <th
          key={i}
        >
          <span className="btn btn-link" disabled>
            {self.state.columns[c].name}
          </span>
        </th>
      );
    });

    // Create filter fields
    var filterLink = null;
    if(!self.props.disableFilter){
      filterLink = function(column) {
        return {
          value: self.state.columns[column].filterText,
          requestChange: self.handleFilterTextChange(column)
        };
      };

      var filterInputs = columnNames.map(function(c, i) {
        if(!self.state.columns[c].disableFilter){
          return <td key={i}><input type="text" valueLink={filterLink(c)} /></td>;
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
    sortedItems.forEach(function(item, idx) {
      if ((self.props.headerRepeat > 0) && (idx > 0) && (idx % self.props.headerRepeat === 0)) {
        allRows.push (
          <tr key={"extra"+idx}>
            { headerExtra() }
          </tr>
        )
      }

      allRows.push(
        <tr key={idx}>
          { rowGenerator(item) }
        </tr>
      );
    });



    return (
      <BSTable
        cellSpacing="0"à
        striped  ={this.props.striped}
        bordered ={this.props.bordered}
        condensed={this.props.condensed}
        hover    ={this.props.hover}
      >
        <thead>
          <tr>
            { header }
          </tr>
          {!self.props.disableFilter ? (
            <tr>
              { filterInputs }
            </tr>
          ) : null }
        </thead>
        <tbody>
          { allRows }
        </tbody>
      </BSTable>
    );
  }
});

module.exports = TableSorter;
