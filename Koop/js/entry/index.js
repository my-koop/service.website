/** @jsx React.DOM */

// Require styles.
require('mykoop.less');

var React = require('react');
var RBS = require('react-bootstrap');
var BSButton = require('react-bootstrap/Button');
var BSButtonToolbar = require('react-bootstrap/ButtonToolbar');

var routeInfo = require('RouteInformation');

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
        $.ajax({
            url: routeInfo.navBarRoute,
            dataType: 'json',
            data : {path: window.location.pathname},
            success: function (data) {
                if(data.links !== undefined) this.setState(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(routeInfo.navBarRoute, status, err.toString());
            }.bind(this)
        })
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
