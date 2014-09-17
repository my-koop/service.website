/** @jsx React.DOM */

// Require styles.
require('mykoop.less');

var React = require('react');
var RBS = require('react-bootstrap');
var BSButton = require('react-bootstrap/Button');
var BSButtonToolbar = require('react-bootstrap/ButtonToolbar');

var routeInfo = require('RouteInformation');
var ajax = require('ajax');

// NavigationBar
// properties :
//              links : Link[]
var NavigationBar = React.createClass({
    getInitialState: function () {
        return {
            links : [{mName:'index',mUrl:'/'}]
        };
    },
    componentDidMount: function () {
        var self = this;
        ajax.request({ endpoint: routeInfo.navBar }, function (err, res) {
            if (err) {
                console.error(routeInfo.navBar, status, err.toString());
                return;
            }
            if (res.body.links) {
                self.setState(res.body);
            }
        });
    },
    render : function() {
        var links = this.state.links.map( function(link,i) {
            return <RBS.NavItem key={i} href={link.mUrl}>{link.mName}</RBS.NavItem>
        });
        return (
            <RBS.Navbar>
              <RBS.Nav>
                {links}
              </RBS.Nav>
            </RBS.Navbar>
        );
    }
});


React.renderComponent((<NavigationBar />), document.body);
