var React = require("react/addons");
var PropTypes = React.PropTypes;
var BSButton = require("react-bootstrap/Button");

var FormInputFactory = require("mykoop-core/components/FormInputFactory");

var PrivilegesExamples = [
  {
    "properties": {
      "name": "edit_members",
      "label": "Edit member informations",
      "isChecked": false
    },
    "type": "checkbox"
  },
  {
    "properties": {
      "name": "view_members",
      "label": "View Members list",
      "isChecked": false
    },
    "type": "checkbox"
  },
  {
    "properties": {
      "name": "add_event",
      "label": "Create new event",
      "isChecked": true
    },
    "type": "checkbox"
  },
  {
    "properties": {
      "name": "edit_event",
      "label": "Edit an event",
      "isChecked": true
    },
    "type": "checkbox"
  },
  {
    "properties": {
      "name": "view_stats",
      "label": "View statistics",
      "isChecked": true
    },
    "type": "checkbox"
  },
  {
    "properties": {
      "name": "use_mailing_list",
      "label": "Contact mailing lists",
      "isChecked": true
    },
    "type": "checkbox"
  },
  {
    "properties": {
      "name": "edit_mailing_lists",
      "label": "Modify mailing lists",
      "isChecked": true
    },
    "type": "checkbox"
  }
]

var UserPrivilegesBox = React.createClass({
  propTypes: {
    privileges: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired
  },
  getDefaultProps: function(){
    return {
      "userId" : "100",
      "privileges" : PrivilegesExamples
    };
  },
  render: function(){
    var privilegeCheckboxes = this.props.privileges.map(function(privilege,key){
      return (
        FormInputFactory("checkbox",privilege.properties,key)
      );
    });
    return (
    <div>
      <span>Editing privileges for user {this.props.userId}</span>
      <div>
        {privilegeCheckboxes}
        <BSButton type="submit">Assign</BSButton>
      </div>
    </div>
    );
  }


});
module.exports = UserPrivilegesBox;
