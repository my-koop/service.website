var React = require("react");
var BSGlyphicon = require("react-bootstrap/Glyphicon");

var PropTypes = React.PropTypes;

var Icon = React.createClass({
  propTypes: {
    library: PropTypes.string,
    glyph: PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
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
