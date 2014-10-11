var React = require("react");
var PropTypes = React.PropTypes;
var BSButton = require("react-bootstrap/Button");
var BSModal = require("react-bootstrap/Modal");

  var AbstractModal = React.createClass({
    propTypes: {
      title      : PropTypes.string,
      modalHeader: PropTypes.renderable,
      modalBody  : PropTypes.renderable.isRequired,
      modalFooter: PropTypes.renderable,
      onRequestHide: PropTypes.func.isRequired,
      useCloseButtonFooter: PropTypes.bool
    },

  populateFooter: function(useCloseButton,hideFunction,Footer){
    if(useCloseButton && Footer){
      return (
        <div className="modal-footer">
          {Footer}
          <BSButton type="close" onClick={hideFunction} >Close</BSButton>
        </div>
      );
    } else if(useCloseButton) {
      return (
        <div className="modal-footer">
          <BSButton type="close" onClick={hideFunction} >Close</BSButton>
        </div>
        );
    } else if( Footer ){
      return (
        <div className="modal-footer">
          {Footer}
        </div>
        );
    } else {
      return null;
    }
  },

  render: function () {
    var header = this.props.modalHeader ? <div className="modal-header"> {this.props.modalHeader} </div>: null;
    return this.transferPropsTo(
      <BSModal title={this.props.title} bsSize="small">
        {header}
        <div className="modal-body">
          {this.props.modalBody}
        </div>
        {this.populateFooter(this.props.useCloseButtonFooter,this.props.onRequestHide,this.props.modalFooter)}
      </BSModal>
    );
  }
});

module.exports = AbstractModal;
