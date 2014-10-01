var React = require("react/addons");
var BSCol = require("react-bootstrap/Col");
var BSTable = require("react-bootstrap/Table");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSPanel = require("react-bootstrap/Panel");
var Router = require("react-router");

var RouteInfo = require("routeInformation");
var Ajax = require("ajax");
var _ = require("lodash");

var ItemsBelowThreshold = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return{
      itemList: [],
      headers: []
    }
  },

  componentWillMount: function(){
    var self = this;
    Ajax.request(
      {endpoint: RouteInfo.itemsBelowThreshold.fullPath},
      function(err,res){
        if (err) {
          console.error(status, err.toString());
          return;
        }

        if (res.body.headers &&
          res.body.data &&
          _.isArray(res.body.headers) &&
          _.isArray(res.body.data)
        ) {
          self.setState({
            itemList: res.body.data,
            headers: res.body.headers
          });
        }
      }
    );
  },

  // Selects all checkboxes in the list
  selectAll: function(){
    var l = this.state.itemList.length;
    var checkBoxState = {};
    for(var i=0; i < l; ++i){
      checkBoxState["item"+i] = true;
    }
    this.setState(checkBoxState);
  },

  // Deselects all checkboxes in the list
  deSelectAll: function(){
    var l = this.state.itemList.length;
    var checkBoxState = {};
    for(var i=0; i < l; ++i){
      checkBoxState["item"+i] = false;
    }
    this.setState(checkBoxState);
  },

  // Counts how many checkbox are checked
  countSelected: function(){
    var l = this.state.itemList.length;
    var count = 0;
    for(var i=0; i < l; ++i){
      // convert value to a boolean before adding
      count += !!this.state["item"+i];
    }
    return count;
  },

  onSubmit: function(e){
    e.preventDefault();
    // only transition if something is selected
    if(this.countSelected() > 0){
      Router.transitionTo(RouteInfo.itemsNextOrder.name);
    }
  },

  render: function() {
    var self = this;
    var headers = this.state.headers;
    var headerComponents = headers.map(function(head, index){
      return (<th key={index}>{head.title}</th>);
    });

    var data = this.state.itemList.map(function(item, i){
      var itemFields = headers.map(function(head, j){
        if(j===0){
          // The first item is a checkbox with the content as the label
          return (
            <td key={j}>
              <BSInput
                type="checkbox"
                checkedLink={self.linkState("item" + i)}
                label={item[head.key]}
              />
            </td>
          );
        }
        return (<td key={j}>{item[head.key]}</td>);
      });

      return (
        <tr key={i}>
          {itemFields}
        </tr>
      );
    });

    return (
      <BSCol md={6}>
        <BSPanel header="Items to Order" >
          <BSButton onClick={this.selectAll}>Select All</BSButton>
          <BSButton onClick={this.deSelectAll}>DeSelect All</BSButton>
          <form onSubmit={this.onSubmit}>
            <BSTable striped bordered condensed hover>
              <thead>
                <tr>
                  {headerComponents}
                </tr>
              </thead>
              <tbody>
                {data}
              </tbody>
            </BSTable>
            {this.countSelected() > 0 ?
              <BSInput
                type="submit"
                bsStyle="primary"
                value="Add Selection to next order"
                className="pull-right"
              />
            : null }
          </form>
        </BSPanel>
      </BSCol>
    );
  }
});

module.exports = ItemsBelowThreshold;
