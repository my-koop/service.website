var React = require("react");
var PropTypes = React.PropTypes;
var BSCol = require("react-bootstrap/Col");
var BSPanel = require("react-bootstrap/Panel");
var MKLoginBox = require("components/LoginBox");
var style = require("grayBg.useable.less");
var LoginPage = React.createClass({

  componentDidMount: function(){
    style.use();
  },

  componentWillUnmount : function(){
    style.unuse();
  },
  
  render: function() {
    return (
      <BSCol sm={6} smOffset={3} md={4} mdOffset={4} lg={3} lgOffset={4.5}>
        <BSPanel header="Please Sign In">
          <MKLoginBox />
        </BSPanel>
      </BSCol>
    );
  }
});

module.exports = LoginPage;
