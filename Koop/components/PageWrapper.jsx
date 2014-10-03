var React = require("react");

var BSGrid = require("react-bootstrap/Grid");
var BSRow = require("react-bootstrap/Row");

var MKDevNavBar = require("components/DevNavBar");
var MKFooter = require("components/Footer");
var MKNavBar = require("components/NavBar");

var PageWrapper = React.createClass({
  propTypes: {
    fluid: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      fluid: false
    };
  },

  render: function() {
    return (
      <div>
        {/* Navigation bar. */}
        <BSRow>
          <MKNavBar />
        </BSRow>
        <BSGrid fluid={this.props.fluid}>
          {/* Main site content. */}
          <BSRow>
            {this.props.children}
          </BSRow>

          {/* Footer. */}
          <BSRow>
            <MKFooter />
          </BSRow>

          {/* To be removed after development. */}
          <BSRow>
            <MKDevNavBar hide />
          </BSRow>
        </BSGrid>
      </div>
    );
  }
});

module.exports = PageWrapper;
