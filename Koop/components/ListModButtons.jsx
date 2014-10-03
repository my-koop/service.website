var React                = require("react");
var PropTypes            = React.PropTypes;
var BSButton             = require("react-bootstrap/Button");
var BSButtonGroup        = require("react-bootstrap/ButtonGroup");
var MKConfirmationTrigger= require("components/ConfirmationTrigger");

var ListModButtons = React.createClass({

  propTypes : {
    hidePlus      : PropTypes.bool,
    hideMinus     : PropTypes.bool,
    hideUp        : PropTypes.bool,
    hideDown      : PropTypes.bool,
    callBackPlus  : PropTypes.func,
    callBackMinus : PropTypes.func,
    callBackUp    : PropTypes.func,
    callBackDown  : PropTypes.func,
    warningMessage: PropTypes.string,
    stopPropagate : PropTypes.bool
  },

  getDefaultProps: function(){
    return {
      hidePlus     : false,
      hideMinus    : false,
      hideUp       : false,
      hideDown     : false,
      callBackPlus : null,
      callBackMinus: null,
      callBackUp   : null,
      callBackDown : null,
      stopPropagate: false
    };
  },

  getOnClickCallback: function(callback){
    if(this.props.stopPropagate){
      return function(e){
        e.stopPropagation();
        if(callback){
          callback.call(null,e);
        }
      }
    }

    return callback;
  },

  render: function() {
    return (
      <BSButtonGroup>
        {!this.props.hidePlus ?
          <BSButton bsSize="small" onClick={this.getOnClickCallback(this.props.callBackPlus)}>
            <span className="glyphicon glyphicon-plus" />
          </BSButton>
        : null }
        {!this.props.hideMinus ?
          this.props.warningMessage ?
            <MKConfirmationTrigger message={this.props.warningMessage} onYes={this.props.callBackMinus}>
              <BSButton bsSize="small" onClick={this.getOnClickCallback(null)}>
                <span className="glyphicon glyphicon-minus" />
              </BSButton>
            </MKConfirmationTrigger>
          : (<BSButton bsSize="small" onClick={this.getOnClickCallback(this.props.callBackMinus)}>
              <span className="glyphicon glyphicon-minus" />
            </BSButton>)
        : null }
        {!this.props.hideUp ?
          <BSButton bsSize="small" onClick={this.getOnClickCallback(this.props.callBackUp)}>
            <span className="glyphicon glyphicon-arrow-up" />
          </BSButton>
        : null }
        {!this.props.hideDown ?
          <BSButton bsSize="small" onClick={this.getOnClickCallback(this.props.callBackDown)}>
            <span className="glyphicon glyphicon-arrow-down" />
          </BSButton>
        : null }
      </BSButtonGroup>
    );
  }
});

module.exports = ListModButtons;
