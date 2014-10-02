//Component hierarchy
//FilterableItemList
//  FilterOptions
//    FilterOption
//  ItemList
//    ItemListHeader
//    ItemRow
//      ItemRowElement

var React = require("react");
var PropTypes = React.PropTypes;
var FormElementFactory = require("components/FormElementFactory");
var BSTable = require("react-bootstrap/Table");


var ItemRowElement = React.createClass({
  propTypes: {
    cellData: PropTypes.string.isRequired
  },
  
  render: function(){
    return(
      <td> {this.props.cellData} </td>
    );
  }

});

var ItemRow = React.createClass({
  propTypes : {
    rowData : PropTypes.array.isRequired
  },
 
  render: function(){
    rowElements = this.props.rowData.map(function(rowElementData,key){
      return (
        <ItemRowElement key={key} cellData={rowElementData} />
      );
    });
    return (
      <tr>
        {rowElements}
      </tr>
    );
  }

});

var ItemListHeader = React.createClass({
  propTypes : {
    headerList: PropTypes.array.isRequired
  },
  
  render: function(){
    headers = this.props.headerList.map(function(header,key){
      return (
        <th key={key}> {header} </th>
      );
    });

    return (
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
    );
  }

});

var ItemList = React.createClass({
  propTypes: {
    tableHeader : PropTypes.array.isRequired,
    tableData : PropTypes.array.isRequired
  },
  render: function(){
    rows = this.props.tableData.map(function(data,key){
      return (
          <ItemRow key={key} rowData={data} />
      );
    });
    return (
      <div>
        <BSTable  responsive>
          <ItemListHeader headerList={this.props.tableHeader}/>
            <tbody>
              {rows}
            </tbody>
        </BSTable>
      </div>
    );
  }
});

var FilterOptions = React.createClass({
  propTypes: {
    options : PropTypes.array
  },
  render: function() {
    optionsArray = this.props.options.map(function(option,key) {
      return (
        <FormElementFactory
          key  ={key}
          type = {option.type}
          properties = {option.properties}/>
        );
    });
    return (
      <div>
        {optionsArray}
      </div>
    );
  }

});

var FilterableItemList = React.createClass({
  propTypes: {
    isFiltered    : PropTypes.bool.isRequired,
    filterOptions : PropTypes.array,
    data          : PropTypes.array.isRequired,
    headers       : PropTypes.array.isRequired
  },
  
  render: function() {
    var Filtering = this.props.isFiltered ? <FilterOptions options={this.props.filterOptions} /> : '' ;
    return (
      <div>
        {Filtering}
        <ItemList tableHeader={this.props.headers} tableData={this.props.data} />
      </div>
    );
  }
});
module.exports = FilterableItemList;
