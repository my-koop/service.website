var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSButton = require("react-bootstrap/Button");
var MKAbstractModal = require("components/AbstractModal");

var MKUserPrivilegesBox = require("components/UserPrivilegesBox");

var UserPrivilegesBody   = <MKUserPrivilegesBox />
var UserPrivilegesTitle  = "Assign Privileges";
var UserPrivilegesModal = React.createClass({

  render: function(){
    return this.transferPropsTo(
      <MKAbstractModal title={UserPrivilegesTitle} modalBody={UserPrivilegesBody} closeButtonFooter={false} /> 
    );
    
  }
});

module.exports = UserPrivilegesModal;