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
        filterText: PropTypes.string,
        cellGenerator: PropTypes.func,
        disableSort: PropTypes.bool,
        disableFilter: PropTypes.bool,
      })).isRequired
    }),

    initialItems: PropTypes.array,
    headerRepeat: PropTypes.number,
    disableSort: PropTypes.bool,
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
        });
  },

  handleFilterTextChange: function(column) {
    return function(newValue) {
      var obj = this.state.columns;
      obj[column].filterText = newValue;

      // Since we have already mutated the state, just call forceUpdate().
      // Ideally we'd copy and setState or use an immutable data structure.
      this.forceUpdate();
    }.bind(this);
  },

  columnNames: function() {
    return Object.keys(this.state.columns);
  },

  sortColumn: function(column) {
    return function(event) {
      var newSortOrder = (this.state.sort.order === "asc") ? "desc" : "asc";

      if (this.state.sort.column != column) {
        newSortOrder = this.state.columns[column].defaultSortOrder || "asc";
      }

      this.setState({sort: { column: column, order: newSortOrder }});
    }.bind(this);
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

    // Extra header generator
    var headerExtra = function() {
      return columnNames.map(function(c, i) {
        return <th key={i} className="header-extra">{self.state.columns[c].name}</th>;
      }, self);
    };

    // Row generator
    var rowGenerator = function(item) {
      return columnNames.map(function(colName, i) {
        var cellGenerator = self.state.columns[colName].cellGenerator;
        if(cellGenerator){
          return cellGenerator.call(self,item,i);
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
          return null;
      });
    }

    return (
      <BSTable
        cellSpacing="0"
        className="tablesorter"
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
