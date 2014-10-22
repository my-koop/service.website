// We have to do this to avoid circular dependency problems.
var moduleExports = {};
module.exports = moduleExports;

var React = require("react");
var MyKoop = require("components/MyKoop");

function render() {
  React.renderComponent(<MyKoop />, document.body);
}

moduleExports.render = render;
