var _ = require("lodash");
var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");
var ajax = require("ajax");
var routeInfo = require("routeInformation");
var BSTable = require("react-bootstrap/Table");
var PropTypes = React.PropTypes; 
var BSButton = require("react-bootstrap/Button");
var MKAddItemQuantity = require("components/AddItemQuantity");

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
      state: PropTypes.object,
      saveStateCallback: PropTypes.func.isRequired
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
    loadData: function() {
        
        /* $.get(dataSource).done(function(data) {
             console.log("Received data");
             this.setState({items: data});
         }.bind(this)).fail(function(error, a, b) {
             console.log("Error loading JSON");
         });*/
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
            var newSortOrder = (this.state.sort.order == "asc") ? "desc" : "asc";

            if (this.state.sort.column != column) {
                newSortOrder = this.state.columns[column].defaultSortOrder;
            }

            this.setState({sort: { column: column, order: newSortOrder }});
        }.bind(this);
    },
    sortClass: function(column) {
        var ascOrDesc = (this.state.sort.order == "asc") ? "headerSortAsc" : "headerSortDesc";
        return (this.state.sort.column == column) ? ascOrDesc : "";
    },
    render: function() {
        var rows = [];

        var columnNames = this.columnNames();
        var filters = {};

        var operandRegex = /^((?:(?:[<>]=?)|==))\s?([-]?\d+(?:\.\d+)?)$/;

        columnNames.forEach(function(column) {
            var filterText = this.state.columns[column].filterText;
            filters[column] = null;

            if (filterText.length > 0) { 
                operandMatch = operandRegex.exec(filterText);
                if (operandMatch && operandMatch.length == 3) {
                    //filters[column] = Function.apply(null, ["x", "return x " + operandMatch[1] + " " + operandMatch[2]]);
                    filters[column] = function(match) { return function(x) { return operators[match[1]](x, match[2]); }; }(operandMatch); 
                } else {
                    filters[column] = function(x) {
                        return (x.toString().toLowerCase().indexOf(filterText.toLowerCase()) > -1);
                    };
                }
            }
        }, this);
    
        var filteredItems = _.filter(this.state.items, function(item) {
            return _.every(columnNames, function(c) {
                return (!filters[c] || filters[c](item[c]));
            }, this);
        }, this);

        var sortedItems = _.sortBy(filteredItems, this.state.sort.column);
        if (this.state.sort.order === "desc") sortedItems.reverse();

        var headerExtra = function() {
            return columnNames.map(function(c) {
                return <th className="header-extra">{this.state.columns[c].name}</th>;
            }, this);   
        }.bind(this);

        var cell = function(x) {
          return columnNames.map(function(c) {
            if(c != "editCol"){
              return <td>{x[c]}</td>;
            }else{
              return <td><MKAddItemQuantity idItem={x["id"]}/></td>
            }
            }, this);
        }.bind(this);

        sortedItems.forEach(function(item, idx) {
            var headerRepeat = parseInt(this.props.headerRepeat, 10);
            if ((this.props.headerRepeat > 0) && 
                (idx > 0) &&
                (idx % this.props.headerRepeat === 0)) {

                rows.push (
                  <tr>
                    { headerExtra() }
                  </tr>
                )
            }

            rows.push(
              <tr key={item.id}>
              { cell(item) }
            </tr>
          );
    }.bind(this));

var filterLink = function(column) {
    return {
        value: this.state.columns[column].filterText,
        requestChange: this.handleFilterTextChange(column)
    };
}.bind(this);

var header = columnNames.map(function(c) {
    return <th onClick={this.sortColumn(c)} className={"header " + this.sortClass(c)}>{this.state.columns[c].name}</th>;
}, this);

var filterInputs = columnNames.map(function(c) {
    return <td><input type="text" valueLink={filterLink(c)} /></td>;
}, this);

return (
  <BSTable cellSpacing="0" className="tablesorter">
    <thead>
      <tr>
        { header }
      </tr>
      <tr>
        { filterInputs }
      </tr>
    </thead>
    <tbody>
      { rows }
    </tbody>
  </BSTable>
);
}
});

module.exports = Homepage;


// TableSorter Config
var CONFIG = {
    sort: { column: "col2", order: "desc" },
    columns: {
        col1: { name: "Col haboub", filterText: "", defaultSortOrder: "desc"},
        col2: { name: "Col2", filterText: "", defaultSortOrder: "desc"},
        col3: { name: "Col3", filterText: "", defaultSortOrder: "desc"},
        editCol: { name: "Edit", filterText: "", defaultSortOrder: "none"}
    }
};

var Homepage = React.createClass({
    render: function() {
        return (
            <BSCol md={12}>

                <div>
                    Coop Bécik est une coopérative de réparation qui a pour mission de rendre accessible l’utilisation du vélo comme mode de transport aux citoyen-ne-s et étudiant-e-s de Montréal.
                </div>
                <div>
                    Ouvert les mardis et mercredis de 17h à 20h Formations 17, 24 septembre et 1er octobre: <a href="http://doodle.com/3z4y37skqyxhtn86">s'inscrire ICI</a>
                </div>

                <div>

                    <TableSorter config={CONFIG} headerRepeat="8" />

               </div>



            </BSCol>
        );
}
});

module.exports = Homepage;
