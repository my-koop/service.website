/** @jsx React.DOM */
var mountNode = document.getElementById('content');

var BS = ReactBootstrap;

var buttonsInstance = (
    <BS.ButtonToolbar>
        <BS.Button href="#">Link</BS.Button>
        <BS.Button>Button</BS.Button>
    </BS.ButtonToolbar>
);

React.renderComponent(buttonsInstance, mountNode);







