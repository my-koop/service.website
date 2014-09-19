var React = require("react");
var Link = require("react-router").Link;

var Homepage = React.createClass({
  render: function() {
    return (
      <div>
        HOMEPAGE!!! <Link to="users">Go to users</Link>
      </div>
    );
  }
});

module.exports = Homepage;
