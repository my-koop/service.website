var React           = require("react");
var BSCol           = require("react-bootstrap/Col");
var BSButton        = require("react-bootstrap/Button");
var BSModalTrigger  = require("react-bootstrap/ModalTrigger");
var MKIcon          = require("components/Icon");

var MKTableSorter   = require("components/TableSorter");
var MKListModButtons= require("components/ListModButtons");
var MKItemEditModal = require("components/ItemEditModal");

var ajax      = require("ajax");
var routeInfo = require("routeInformation");

var actionsGenerator = function(item){
  return [
    {
      content: ( <MKIcon glyph="star" library="glyphicon" /> ),
      tooltip: {
        text: "Save as favorite!",
        overlayProps: {
          placement: "left"
        }
      }
    },
    {
      icon: "plus",
      tooltip: {
        text: "Increase quantity",
        overlayProps: {
          placement: "top",
        }
      }
    },
    {
      icon: "minus",
      warningMessage: "Are you sure?",
      tooltip: {
        text: "Delete",
        overlayProps: {
          placement: "top"
        }
      },
      callback: function(){
        alert("You deleted the item, or did you?");
      }
    },
    {
      icon: "edit",
      tooltip: {
        text: "Edit Item",
        overlayProps: {
          placement: "right"
        }
      },
      customWrapper: function(component, iBtn){
        return (
          <BSModalTrigger
            key={iBtn}
            modal={<MKItemEditModal name={item["col3"]} itemId={item["id"]}/> }
          >
            {component}
          </BSModalTrigger>
        );
      }
    },
  ];
}

var Items = React.createClass({

  getInitialState: function(){
    return {
      items: []
    }
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

  render: function() {

    // TableSorter Config
    var CONFIG = {
      columns: {
        id: { name: "ID" },
        col1: { name: "Code" },
        col2: { name: "Quantity" },
        col3: { name: "Name" },
        editCol: {
          name: "Actions",
          disableSort: true,
          disableFilter: true,
          cellGenerator: function(item){
            var self = this;
            return (
              <MKListModButtons
                defaultTooltipDelay={500}
                buttons={actionsGenerator.call(this,item)}
              />
            );
          }
        }
      }
    };

    return (
      <BSCol md={12}>
        <div>
          <MKTableSorter config={CONFIG} items={this.state.items} headerRepeat={8} striped bordered condensed hover />
        </div>
      </BSCol>
    );
  }
});

module.exports = Items;
