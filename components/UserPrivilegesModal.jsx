var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSButton = require("react-bootstrap/Button");
var MKAbstractModal = require("mykoop-core/components/AbstractModal");

var MKUserPrivilegesBox = require("./UserPrivilegesBox");

var UserPrivilegesBody   = <MKUserPrivilegesBox />
var UserPrivilegesTitle  = "Assign Privileges";
var UserPrivilegesModal = React.createClass({

  render: function(){
    return this.transferPropsTo(
      <MKAbstractModal title={UserPrivilegesTitle} modalBody={UserPrivilegesBody} useCloseButtonFooter={true} />
    );

  }
});

module.exports = UserPrivilegesModal;
