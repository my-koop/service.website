var React = require("react");
var Link = require("react-router").Link;
var BSCol = require("react-bootstrap/Col");

var Homepage = React.createClass({
    render: function() {
        return (
            <BSCol md={6} mdOffset={3}>
                <div>
                    Coop Bécik est une coopérative de réparation qui a pour mission de rendre accessible l’utilisation du vélo comme mode de transport aux citoyen-ne-s et étudiant-e-s de Montréal. 
                </div>
                <div>
                    Ouvert les mardis et mercredis de 17h à 20h Formations 17, 24 septembre et 1er octobre: <a href="http://doodle.com/3z4y37skqyxhtn86">s'inscrire ICI</a>
                </div>
                <div className="embed-responsive embed-responsive-4by3">
                <iframe className="col-md-12" src="https://www.google.com/calendar/embed?title=Calendrier%20Coop%20B%C3%A9cik&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=coopbecik%40gmail.com&amp;color=%232F6309&amp;src=e1ae58h2v9jksrva53b4vhqf2s%40group.calendar.google.com&amp;color=%23B1440E&amp;src=ch0vf71v42e3stg5leue5ft06k%40group.calendar.google.com&amp;color=%235229A3&amp;src=%23contacts%40group.v.calendar.google.com&amp;color=%232952A3&amp;ctz=America%2FToronto" 
                    style={{borderWidth: 0}}  
                    frameBorder="0" 
                    scrolling="no" 
                    height={300}
                >
                </iframe>
                </div>
            </BSCol>
        );
    }
});

module.exports = Homepage;
