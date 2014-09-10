/** @jsx React.DOM */
var mountNode = document.getElementById('content');

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var BS = ReactBootstrap;

var buttonsInstance = (
    <BS.ButtonToolbar>
        <BS.Button href="#">Link</BS.Button>
        <BS.Button>Button</BS.Button>
    </BS.ButtonToolbar>
);

React.renderComponent(buttonsInstance, mountNode);
