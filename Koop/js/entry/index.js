/** @jsx React.DOM */

// Require styles.
require('mykoop.less');

var React = require('react');
var BSButton = require('react-bootstrap/Button');
var BSButtonToolbar = require('react-bootstrap/ButtonToolbar');

var buttonsInstance = (
  <div>
    <BSButtonToolbar>
      <BSButton href="#">Link</BSButton>
      <BSButton>Button</BSButton>
    </BSButtonToolbar>
    <p className="demo">This should have a red backround!</p>
  </div>
);

React.renderComponent(buttonsInstance, document.body);
