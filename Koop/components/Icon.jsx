var React = require("react");
var BSGlyphicon = require("react-bootstrap/Glyphicon");

var PropTypes = React.PropTypes;

var Icon = React.createClass({
  propTypes: {
    // String to be used as a class prefix for the approriate glyphicon library.
    library: PropTypes.string,
    glyph: PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      // Font Awesome glyphicons.
      // See: https://fortawesome.github.io/Font-Awesome/icons/
      library: "fa"
    };
  },

  render : function() {
    var library = this.props.library;

    if (library === "glyphicon") {
      return (
        <BSGlyphicon glyph={this.props.glyph} />
      );
    }

    return (
      <i className={library + " " + library + "-" + this.props.glyph}></i>
    );
  }
});

module.exports = Icon;
