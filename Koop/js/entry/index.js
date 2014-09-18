/** @jsx React.DOM */

// Require styles.
require('mykoop.less');

var React = require('react');
var RBS = require('react-bootstrap');

var routeInfo = require('routeInformation');
var ajax = require('ajax');

// NavigationBar
// properties :
//              links : Link[]
var NavigationBar = React.createClass({
    getInitialState: function () {
        return {
            links : [{name:'index',url:'/'}]
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
            return <RBS.NavItem key={i} href={link.url}>{link.name}</RBS.NavItem>
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
