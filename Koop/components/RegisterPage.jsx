var React = require("react/addons");
var BSPanel = require("react-bootstrap/Panel");
var BSInput = require("react-bootstrap/Input");
var BSAlert = require("react-bootstrap/Alert");
var BSButton = require("react-bootstrap/Button");
var BSAccordion = require("react-bootstrap/Accordion");

var totalPanels = 3;
var FirstField = [
  "email",
  "age",
  "mailing1"
];


var RegisterPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return {
      key: 0,
      success: 0
    };
  },

  hasSentSuccessfully: function(){
    return this.state.success === 1;
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

  getMessage: function(){
    switch(this.state.success){
    case 1: return "Successfully created profile";
    case 2: return "Error(s) in form"
    default: return null;
    }
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
    if(!e.shiftKey && e.keyCode === 9){
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
                onKeyDown={this.checkGoingUpKey}
              />
              <BSInput 
                type="select" 
                defaultValue="visit" 
                label="How did you find us"
                valueLink={this.linkState("referral")}
              >
                <option value="visit">On-Site Visit</option>
                <option value="friend">Friend referral</option>
                <option value="ads">Ads</option>
                <option value="other">Other</option>
              </BSInput>
              {this.state.referral === "other" ? 
                <BSInput 
                  type="text"
                  label="Please Specify"
                  valueLink={this.linkState("referralSpecify")}
                />
              : null
              }
              <BSInput 
                type="select" 
                defaultValue="everyday" 
                label="Bike usage"
              >
                <option value="everyday">Every Day</option>
                <option value="fewWeek">Few times a week</option>
                <option value="fewMonth">Few times a month</option>
                <option value="fewYear">Few times a year</option>
                <option value="never">Never</option>
              </BSInput>
              <BSInput 
                type="text"
                label="Why do you use a bike"
                onKeyDown={this.checkGoingDownKey}
              />
              <BSButton onClick={this.nextPanel} className="pull-right">Next</BSButton>
            </BSPanel>

            <BSPanel header="Subscribe Options" key={2}>
              <BSPanel header="Mailing Lists">
                <BSInput 
                  type="checkbox" 
                  label="General Mailing List"
                  ref="mailing1"
                  onKeyDown={this.checkGoingUpKey}
                />
                <BSInput 
                  type="checkbox" 
                  label="Events Mailing List"
                />
              </BSPanel>
            </BSPanel>

          </BSAccordion>
          <BSInput type="submit" bsStyle="primary" bsSize="large" value="Submit" className="pull-right"/>
        </form>
      </BSPanel>
    );
  }
});

module.exports = RegisterPage;
