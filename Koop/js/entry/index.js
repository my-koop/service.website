/** @jsx React.DOM */
var mountNode = document.getElementById('content');

var BS = ReactBootstrap;

var buttonsInstance = (
    <BS.ButtonToolbar>
        <BS.Button href="#">Link</BS.Button>
        <BS.Button>Button</BS.Button>
    </BS.ButtonToolbar>
);

var buttonGroupInstance = (
    <ButtonToolbar>
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button>5</Button>
        <Button>6</Button>
        <Button>7</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button>8</Button>
      </ButtonGroup>
    </ButtonToolbar>
  );

React.renderComponent(buttonGroupInstance, mountNode);
