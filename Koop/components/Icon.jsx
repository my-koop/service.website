var React = require("react/addons");
var BSGlyphicon = require("react-bootstrap/Glyphicon");

var classSet = React.addons.classSet;
var PropTypes = React.PropTypes;

var Icon = React.createClass({
  propTypes: {
    // String to be used as a class prefix for the approriate glyphicon library.
    library: PropTypes.string,
    glyph: PropTypes.string.isRequired,
    fixedWidth: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      // Font Awesome glyphicons.
      // See: https://fortawesome.github.io/Font-Awesome/icons/
      library: "fa",
      fixedWidth: false
    };
  },

  render : function() {
    var library = this.props.library;

    if (library === "glyphicon") {
      return (
        <BSGlyphicon glyph={this.props.glyph} />
      );
    }

    var classes = {};

    classes[library] = true;
    classes[library + "-" + this.props.glyph] = true;
    classes[library + "-fw"] = this.props.fixedWidth;

    return this.transferPropsTo(
      <i className={classSet(classes)}></i>
    );
  }
});

module.exports = Icon;
