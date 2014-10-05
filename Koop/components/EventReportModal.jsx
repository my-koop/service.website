var React = require("react");
var BSModal = require("react-bootstrap/Modal");
var BSInput = require("react-bootstrap/Input");
var BSButton = require("react-bootstrap/Button");
var BSTable = require("react-bootstrap/Table");

var EventReportModal = React.createClass({
  propTypes: {
    infos: React.PropTypes.shape({
      price: React.PropTypes.string,
      name: React.PropTypes.string,
      date: React.PropTypes.string,
      startTime: React.PropTypes.string,
      endTime: React.PropTypes.string,
      givenBy: React.PropTypes.string,
      numberRegistered: React.PropTypes.number,
      numberAttendies: React.PropTypes.number,
      totalSales: React.PropTypes.string
    })
  },
  render: function () {   
    return this.transferPropsTo(
      <BSModal title="Event report" backdrop="static">
        <div className="modal-body"> 
          <h2>{this.props.infos.name}</h2>
          <h4>{this.props.infos.date}</h4>
          <h4>{this.props.infos.startTime} - {this.props.infos.endTime} </h4>
          <BSInput type="static" label="Given by" value={this.props.infos.givenBy} />
          <BSInput type="static" label="Price per person" value={this.props.infos.price + "$"} />
          <BSInput type="static" label="Number of registered persons" value={this.props.infos.numberRegistered} />
          <BSInput type="static" label="Number of actual attendies" value={this.props.infos.numberAttendies} />
          <BSInput type="static" label="Total sales" value={this.props.infos.totalSales + "$"} />
         
          <br/>
          <BSButton bsStyle="primary">Export to PDF</BSButton>
         
        </div>

        <div className="modal-footer">
          <BSButton onClick={this.props.onRequestHide}>Close</BSButton>
        </div>
      </BSModal>
    );
  }
});

module.exports = EventReportModal;