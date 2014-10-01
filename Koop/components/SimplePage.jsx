var React = require("react");
var BSCol = require("react-bootstrap/Col");
var style = require("grayBg.useable.less");

var SimplePage = React.createClass({

  componentDidMount: function(){
    style.use();
  },

  componentWillUnmount : function(){
    style.unuse();
  },
  
  render: function() {
    return (
      <BSCol sm={6} smOffset={3} md={4} mdOffset={4} lg={3} lgOffset={4.5}>
        {this.props.activeRouteHandler()}
      </BSCol>
    );
  }
});

module.exports = SimplePage;
