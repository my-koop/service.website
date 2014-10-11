var React = require("react");

var MKPageWrapper = require("components/PageWrapper");

var PublicWrapper = React.createClass({
  render: function() {
    return (
      <MKPageWrapper>
        {this.props.activeRouteHandler()}
      </MKPageWrapper>
    );
  }
});

module.exports = PublicWrapper;
