var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");

var Homepage = React.createClass({
    render: function() {
        return (
            <BSCol md={6} mdOffset={3}>
                <div>
                    Coop B�cik est une coop�rative de r�paration qui a pour mission de rendre accessible l�utilisation du v�lo comme mode de transport aux citoyen-ne-s et �tudiant-e-s de Montr�al. 
                </div>
                <div>
                    Ouvert les mardis et mercredis de 17h � 20h Formations 17, 24 septembre et 1er octobre: <a href="http://doodle.com/3z4y37skqyxhtn86">s'inscrire ICI</a>
                </div>
                
            </BSCol>
        );
    }
});

module.exports = Homepage;
