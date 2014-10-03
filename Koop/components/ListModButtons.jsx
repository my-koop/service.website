var React                = require("react");
var PropTypes            = React.PropTypes;
var BSButton             = require("react-bootstrap/Button");
var BSButtonGroup        = require("react-bootstrap/ButtonGroup");
// use of another overlay trigger to be able to send down onClick handlers
var BSOverlayTrigger     = require("components/CustomOverlayTrigger");
var BSTooltip            = require("react-bootstrap/Tooltip");

var MKConfirmationTrigger= require("components/ConfirmationTrigger");
var MKIcon               = require("components/Icon");


var ListModButtons = React.createClass({

  propTypes : {
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        content: PropTypes.renderable,
        callback: PropTypes.func,
        warningMessage: PropTypes.string,
        hide: PropTypes.bool,
        tooltip: PropTypes.shape({
          text: PropTypes.renderable.isRequired,
          overlayProps: PropTypes.object
        }),
        customWrapper: PropTypes.func
      })
    ).isRequired,
    stopPropagation : PropTypes.bool,
    defaultTooltipDelay: PropTypes.number
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
      if(btn.hide || (!btn.icon && !btn.content)) return null;

      // Show content if available, otherwise fallback to the icon
      var content = btn.content ? btn.content : <MKIcon glyph={btn.icon} />;

      var buttonOnClick = btn.warningMessage ? self.getOnClickCallback(null) : self.getOnClickCallback(btn.callback);
      var button = (
        <BSButton bsSize="small" onClick={buttonOnClick} key={i}>
          {content}
        </BSButton>
      );

      var result = button;

      if(btn.warningMessage){
        result = (
          <MKConfirmationTrigger message={btn.warningMessage} onYes={btn.callback} key={i}>
            {result}
          </MKConfirmationTrigger>
        );
      }

      if(btn.tooltip){
        var props = btn.tooltip.overlayProps || {};
        props.delay = props.delay || self.props.defaultTooltipDelay || 0;
        result = (
          <BSOverlayTrigger
            key={i}
            {...props}
            overlay={(
              <BSTooltip>
                {btn.tooltip.text}
              </BSTooltip>
            )
          }>
            {result}
          </BSOverlayTrigger>
        );
      }

      if(btn.customWrapper){
        result = btn.customWrapper(result, i);
      }

      return result;
    });

    return (
      <BSButtonGroup>
        {buttons}
      </BSButtonGroup>
    );
  }
});

module.exports = ListModButtons;
