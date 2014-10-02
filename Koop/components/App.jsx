var React = require("react");

var MKDevNavBar = require("components/DevNavBar");
var MKNavBar = require("components/NavBar");
var BSGrid = require("react-bootstrap/Grid");
var BSCol = require("react-bootstrap/Col");
var BSRow = require("react-bootstrap/Row");


var App = React.createClass({

  render: function() {
    return (
      <div>
        {/* Navigation bar. */}
        <BSRow>
          <MKNavBar />
        </BSRow>
        <BSGrid>
          {/* Main site content. */}
          <BSRow>
            {this.props.activeRouteHandler()}
          </BSRow>

          {/* Footer. */}
          <BSRow>
            <footer>
              <p className="text-center">2014 - Site running on MyKoop platform</p>
            </footer>
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

module.exports = App;
