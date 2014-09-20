var React = require("react");
var Link = require("react-router").Link;

var Users = React.createClass({
  render: function() {
    return (
      <div>
        USERS!!! <Link to="app">Go to homepage.</Link>
      </div>
    );
  }
});

module.exports = Users;
