var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSCol = require("react-bootstrap/Col");
var BSTable = require("react-bootstrap/Table");
var BSInput = require("react-bootstrap/Input");


var RouteInformation = require("routeInformation");
var Ajax = require("ajax");
var Definitions = require("itemsThreshold");
var headers = Definitions.Item.ITEMS_HEADER;
var _ = require("lodash");

var ItemsBelowThreshold = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return{
      itemList: []
    }
  },

  componentWillMount: function(){
    var self = this;
    Ajax.request(
      {endpoint: RouteInformation.itemsBelowThreshold.fullPath},
      function(err,res){
        if (err) {
          console.error(status, err.toString());
          return;
        }

        if (res.body && _.isArray(res.body)) {
          self.setState({ 
            itemList: res.body
          });
        }
      }
    );
  },

  render: function() {
    var self = this;
    var header = headers.map(function(head, index){
      return (<th key={index}>{head.title}</th>);
    });

    var data = this.state.itemList.map(function(item, i){
      var itemFields = headers.map(function(head, j){
        if(j===0){
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
      <BSCol>
        <form>
          <BSTable striped bordered condensed hover>
            <thead>
              <tr>
                {header}
              </tr>
            </thead>
            <tbody>
              {data}
            </tbody>
          </BSTable>
        </form>
      </BSCol>
    );
  }
});

module.exports = ItemsBelowThreshold;
