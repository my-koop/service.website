var React                = require("react");
var PropTypes            = React.PropTypes;
var BSButton             = require("react-bootstrap/Button");
var BSButtonGroup        = require("react-bootstrap/ButtonGroup");
var MKConfirmationTrigger= require("components/ConfirmationTrigger");
var MKIcon               = require("components/Icon");

var ListModButtons = React.createClass({

  propTypes : {
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
        callback: PropTypes.func,
        warningMessage: PropTypes.string,
        hide: PropTypes.bool
      })
    ).isRequired,
    stopPropagation : PropTypes.bool
  },

  getOnClickCallback: function(callback){
    if(this.props.stopPropagation){
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
      if(btn.hide || (!btn.icon && !btn.text)) return null;

      var content = btn.icon ? <MKIcon glyph={btn.icon} /> : btn.text;

      return btn.warningMessage ?
        <MKConfirmationTrigger message={btn.warningMessage} onYes={btn.callback} key={i}>
          <BSButton bsSize="small" onClick={self.getOnClickCallback(null)}>
            {content}
          </BSButton>
        </MKConfirmationTrigger>
      : (
        <BSButton bsSize="small" onClick={self.getOnClickCallback(btn.callback)} key={i}>
          {content}
        </BSButton>
      )
    });

    return (
      <BSButtonGroup>
        {buttons}
      </BSButtonGroup>
    );
  }
});

module.exports = ListModButtons;
