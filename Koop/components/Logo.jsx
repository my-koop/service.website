var React = require("react");

var Logo = React.createClass({
  propTypes: {
    responsive: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      responsive: true
    };
  },

  render : function() {
    return (
      <img
        className={this.props.responsive ? "img-responsive" : ""}
        src="/coopbeciklogo.png"
        title="Coop Bécik"
        alt="Coop Bécik logo"
      />
    );
  }
});

module.exports = Logo;
