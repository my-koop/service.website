var React = require("react");
var BSPanel = require("react-bootstrap/Panel");
var BSInput = require("react-bootstrap/Input");
var BSAlert = require("react-bootstrap/Alert");
var BSButton = require("react-bootstrap/Button");
var BSAccordion = require("react-bootstrap/Accordion");

var totalPanels = 3;
var FirstField = [
  "email",
  "age",
  "option1"
];


var RegisterPage = React.createClass({

  getInitialState: function(){
    return {
      key: 0
    };
  },

  onSubmit: function(e){
    // Prevents sending another request if it succeeded
    if(!this.hasSentSuccessfully()){
      this.setState({
        success: Math.floor( Math.random() * 2 ) + 1
      });
    }
    e.preventDefault();
  },

  checkGoingUpDownKey: function(e){
    if(e.shiftKey && e.keyCode === 9){
      this.previousPanel();
      e.preventDefault();
    } else if(e.keyCode === 9){
      this.nextPanel();
      e.preventDefault();
    }
  },

  checkGoingUpKey: function(e){
    if(e.shiftKey && e.keyCode === 9){
      this.previousPanel();
      e.preventDefault();
    }
  },

  checkGoingDownKey: function(e){
    if(e.keyCode === 9){
      this.nextPanel();
      e.preventDefault();
    }
  },

  previousPanel: function(){
    var key = this.state.key ? this.state.key - 1 : totalPanels - 1;
    this.selectPanel(key);
  },

  nextPanel: function(){
    this.selectPanel((this.state.key+1)%totalPanels);
  },

  selectPanel: function(key){
    this.setState({
      key: key
    }, function(){
      this.refs[FirstField[key]].getInputDOMNode().focus();
    });
  },

  handleSelect: function(selectedKey) {
    this.selectPanel(selectedKey);
  },

  render: function() {
    return (
      <BSPanel header="Register Form">
        <form onSubmit={this.onSubmit}>
          <BSAccordion activeKey={this.state.key} onSelect={this.handleSelect}>
            <BSPanel header="Account Info" key={0}>
              {this.state.success ?
                <BSAlert>
                  {this.getMessage()}
                </BSAlert>
              : null}
              <BSInput
                type="email"
                label="E-Mail"
                placeholder="E-Mail"
                autoFocus
                ref="email"
              />
              <BSInput
                type="password"
                label="Password"
                placeholder="Password"
              />
              <BSInput
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                onKeyDown={this.checkGoingDownKey}
              />
              <BSButton onClick={this.nextPanel} className="pull-right">Next</BSButton>
            </BSPanel>
            <BSPanel header="Optionnal Info" key={1}>
              <BSInput
                type="number"
                label="Age"
                placeholder="Age"
                ref="age"
                onKeyDown={this.checkGoingUpDownKey}
              />
              <BSButton onClick={this.nextPanel} className="pull-right">Next</BSButton>
            </BSPanel>
            <BSPanel header="Subscribe Options" key={2}>
              <BSInput
                type="text"
                label="Option"
                placeholder="Enter option choice"
                ref="option1"
                onKeyDown={this.checkGoingUpDownKey}
              />
            </BSPanel>
          </BSAccordion>
          <BSInput type="submit" bsStyle="primary" bsSize="large" value="Submit" className="pull-right"/>
        </form>
      </BSPanel>
    );
  }
});

module.exports = RegisterPage;
