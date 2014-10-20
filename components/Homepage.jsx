var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");
var BSModalTrigger = require("react-bootstrap/ModalTrigger");

var MKLoginModal          = require("components/LoginModal");
var MKUserPrivilegesModal = require("components/UserPrivilegesModal");
var MKMailingSendModal    = require("components/MailingListSendModal");

var MKItemList = require("mykoop-inventory/components").ItemList;

var __ = require("language").__;

var Homepage = React.createClass({

  render: function() {
    return (
      <BSCol md={6} mdOffset={3}>
        <BSModalTrigger modal={<MKLoginModal />} >
          <BSButton >Login</BSButton>
        </BSModalTrigger>
        <BSModalTrigger modal={<MKUserPrivilegesModal />} >
          <BSButton >Privileges</BSButton>
        </BSModalTrigger>
        <BSModalTrigger modal={<MKMailingSendModal />} >
          <BSButton >Send Mail</BSButton>
        </BSModalTrigger>
        <div>
          <strong>{__("testString")}</strong>
          Coop Bécik est une coopérative de réparation qui a pour mission de rendre accessible l’utilisation du vélo comme mode de transport aux citoyen-ne-s et étudiant-e-s de Montréal.
          <MKItemList />
        </div>
        <div>
          Ouvert les mardis et mercredis de 17h à 20h Formations 17, 24 septembre et 1er octobre: <a href="http://doodle.com/3z4y37skqyxhtn86">s'inscrire ICI</a>
        </div>
      </BSCol>
    );
  }

});

module.exports = Homepage;
