var React = require("react");
var BSModal = require("react-bootstrap/Modal");
var BSInput= require("react-bootstrap/Input");
var BSButton= require("react-bootstrap/Button");

var EventSignupModal = React.createClass({
  propTypes: {
    infos: React.PropTypes.shape({
      price: React.PropTypes.string,
      name: React.PropTypes.string,
      date: React.PropTypes.string
    })
  },
  render: function () {   
    return this.transferPropsTo(
      <BSModal title="Event signup" backdrop="static">
        <div className="modal-body" > 
         <form>
          <h1>{this.props.infos.name}</h1>
          <h3>{this.props.infos.date}</h3>
          <BSInput type="static" label="Price per person" value={this.props.infos.price + "$"} />
          <BSInput type="select" defaultValue="2" label="Number of persons">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </BSInput>
          <BSInput type="static" label="Total" value="10.00$" />
          <br/>
          <BSInput block type="submit" bsStyle="success" bsSize="large" value="Signup for event" />
         </form>
        </div>

        <div className="modal-footer">
          <BSButton onClick={this.props.onRequestHide}>Cancel</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = EventSignupModal;