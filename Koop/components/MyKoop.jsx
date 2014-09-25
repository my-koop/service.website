var React = require("react");
var ReactRouter = require("react-router");

var DefaultRoute = ReactRouter.DefaultRoute;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var RouteInfo = require("routeInformation");

var MKApp = require("components/App");
var MKHomepage = require("components/Homepage");
var MKPlaceHolder = require("components/PlaceHolder");

var MyKoop = React.createClass({
  render: function() {
    return (
      <Routes location="history">
        <Route name={RouteInfo.homepage.name} path={RouteInfo.homepage.fullPath} handler={MKApp}>
          <DefaultRoute handler={MKHomepage}/>
          <Route name={RouteInfo.aboutUs.name} path={RouteInfo.aboutUs.relativePath} handler={MKPlaceHolder}/>
          <Route name={RouteInfo.pwdRcv.name} path={RouteInfo.pwdRcv.relativePath} handler={MKPlaceHolder}/>
          <Route name={RouteInfo.myaccount.name} path={RouteInfo.myaccount.relativePath} handler={MKPlaceHolder}>
            <Route name={RouteInfo.register.name} path={RouteInfo.register.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.login.name} path={RouteInfo.login.relativePath} handler={MKPlaceHolder}/>
          </Route>
          <Route name={RouteInfo.shop.name} path={RouteInfo.shop.relativePath} handler={MKPlaceHolder}>
            <Route name={RouteInfo.cart.name} path={RouteInfo.cart.relativePath} handler={MKPlaceHolder}/>
          </Route>
        </Route>
        <Route name={RouteInfo.dashboard.name} path={RouteInfo.dashboard.fullPath} handler={MKApp}>
          <DefaultRoute handler={MKHomepage}/>
          <Route name={RouteInfo.options.name} path={RouteInfo.options.relativePath} handler={MKPlaceHolder}/>
          <Route name={RouteInfo.stats.name} path={RouteInfo.stats.relativePath} handler={MKPlaceHolder}/>
          <Route name={RouteInfo.transaction.name} path={RouteInfo.transaction.relativePath} handler={MKPlaceHolder}>
          </Route>
          <Route name={RouteInfo.events.name} path={RouteInfo.events.relativePath} handler={MKPlaceHolder}>
            <Route name={RouteInfo.events_pos.name} path={RouteInfo.events_pos.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.events_report.name} path={RouteInfo.events_report.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.events_signup.name} path={RouteInfo.events_signup.relativePath} handler={MKPlaceHolder}/>
          </Route>
          <Route name={RouteInfo.items.name} path={RouteInfo.items.relativePath} handler={MKPlaceHolder}>
            <Route name={RouteInfo.items_itemsbelowthreshold.name} path={RouteInfo.items_itemsbelowthreshold.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.items_nextorder.name} path={RouteInfo.items_nextorder.relativePath} handler={MKPlaceHolder}/>
          </Route>
          <Route name={RouteInfo.mailing.name} path={RouteInfo.mailing.relativePath} handler={MKPlaceHolder}>
            <Route name={RouteInfo.mailing_send.name} path={RouteInfo.mailing_send.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.mailing_subscribe.name} path={RouteInfo.mailing_subscribe.relativePath} handler={MKPlaceHolder}/>
          </Route>
          <Route name={RouteInfo.members.name} path={RouteInfo.members.relativePath} handler={MKPlaceHolder}>
            <Route name={RouteInfo.members_permissions.name} path={RouteInfo.members_permissions.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.volunteer_availability.name} path={RouteInfo.volunteer_availability.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.volunteer_schedule.name} path={RouteInfo.volunteer_schedule.relativePath} handler={MKPlaceHolder}/>
          </Route>
        </Route>
      </Routes>
    );
  }
});

module.exports = MyKoop;
