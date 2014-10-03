var React                = require("react");
var PropTypes            = React.PropTypes;
var BSButton             = require("react-bootstrap/Button");
var BSButtonGroup        = require("react-bootstrap/ButtonGroup");
var MKConfirmationTrigger= require("components/ConfirmationTrigger");
var MKIcon               = require("components/icon");

var ListModButtons = React.createClass({

  propTypes : {
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        callback: PropTypes.func,
        warningMessage: PropTypes.string,
        hide: PropTypes.bool
      })
    ).isRequired,
    stopPropagate : PropTypes.bool
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

    var self = this;
    var buttons = this.props.buttons.map(function(btn, i){
      if(btn.hide) return null;

      return btn.warningMessage ?
        <MKConfirmationTrigger message={btn.warningMessage} onYes={btn.callback}>
          <BSButton bsSize="small" onClick={self.getOnClickCallback(null)}>
            <MKIcon glyph={btn.icon} />
          </BSButton>
        </MKConfirmationTrigger>
      : (<BSButton bsSize="small" onClick={self.getOnClickCallback(btn.callback)}>
          <MKIcon glyph={btn.icon} />
        </BSButton>)
    });

    return (
      <BSButtonGroup>
        {buttons}
      </BSButtonGroup>
    );
  }
});

module.exports = ListModButtons;
