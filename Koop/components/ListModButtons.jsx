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
        // Use either icon or content
        icon: PropTypes.string,
        content: PropTypes.renderable,
        // Callback when the button is clicked or confirmation on warning
        // function(e: onClickEvent) : void
        callback: PropTypes.func,
        // Shows a confirmation box with the message in it
        warningMessage: PropTypes.string,
        // use this to hide the button (useful if used with a condition)
        hide: PropTypes.bool,
        // Shows a tooltip for the button
        tooltip: PropTypes.shape({
          text: PropTypes.renderable.isRequired,
          overlayProps: PropTypes.object
        }),
        // Callback to wrap the button (and optionnal wrapper) with something else
        // careful the end result will be placed in a ButtonGroup
        // function(component: ReactComponent, iBtn: number) : ReactComponent
        customWrapper: PropTypes.func
      })
    ).isRequired,
    // Prevent button to send onClick event upward
    stopPropagation : PropTypes.bool,
    // Default Delay in ms before show/hide of tooltip
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

      // onClick handler
      var buttonOnClick = btn.warningMessage ? self.getOnClickCallback(null) : self.getOnClickCallback(btn.callback);
      // Actual button
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
