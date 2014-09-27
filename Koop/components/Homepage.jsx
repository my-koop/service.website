var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");
var BSOverlayMixin = require("react-bootstrap/OverlayMixin");
var MKLoginBox = require("components/LoginBox");
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");

var Homepage = React.createClass({

  mixins: [BSOverlayMixin],

  getInitialState: function(){
    return {
      showLogin: false,
      loginState: {}
    };
  },

  handleLoginShow: function(){
    this.setState({
      showLogin: !this.state.showLogin
    });
  },

  render: function() {
    return (
      <BSCol md={6} mdOffset={3}>
        <BSButton onClick={this.handleLoginShow} >Login</BSButton>
        <div>
          Coop Bécik est une coopérative de réparation qui a pour mission de rendre accessible l’utilisation du vélo comme mode de transport aux citoyen-ne-s et étudiant-e-s de Montréal.
        </div>
        <div>
          Ouvert les mardis et mercredis de 17h à 20h Formations 17, 24 septembre et 1er octobre: <a href="http://doodle.com/3z4y37skqyxhtn86">s'inscrire ICI</a>
        </div>
      </BSCol>
    );
  },

  renderOverlay: function () {
    if(!this.state.showLogin){
      return <span/>;
    }
    var self = this;
    var saveLoginState = function(state){
      self.setState({
        loginState: state
      });
    };
    return (
      <BSModal title="Please Sign In" onRequestHide={this.handleLoginShow}>
        <div className="modal-body">
          <MKLoginBox state={this.state.loginState} saveStateFunction={saveLoginState}/>
        </div>
        <div className="modal-footer">
          <BSButton onClick={this.handleLoginShow}>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = Homepage;
