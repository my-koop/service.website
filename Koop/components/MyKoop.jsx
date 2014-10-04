var React = require("react");
var ReactRouter = require("react-router");

var DefaultRoute = ReactRouter.DefaultRoute;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var RouteInfo = require("routeInformation");


var MKApp                  = require("components/App");
var MKSimplePage           = require("components/SimplePage");
var MKPlaceHolder          = require("components/PlaceHolder");
var MKParentPlaceHolder    = require("components/ParentPlaceHolder");
var MKLoginPage            = require("components/LoginPage");
var MKMyAccountPage        = require("components/MyAccountPage");
var MKPasswordRecoveryPage = require("components/PasswordRecoveryPage");
var MKOptionsPage          = require("components/OptionsPage");
var MKRegisterPage         = require("components/RegisterPage");
var MKItemsBelowThreshold  = require("components/ItemsBelowThreshold");
var MKUserPrivilegesPage   = require("components/UserPrivilegesPage");
var MKEventsList           = require("components/EventsList");
var MKItems                = require("components/Items");
var MKVolunteerAvailability= require("components/VolunteerAvailability");
var MKMailingListSendPage  = require("components/MailingListSendPage");
var MKTransactionList      = require("components/TransactionList");

var MyKoop = React.createClass({
  render: function() {
    return (
      <Routes location="history">
        <Route name="app" handler={MKApp}>

          {/*Public pages*/}
          <Route name={RouteInfo.homepage.name} path={RouteInfo.homepage.fullPath} handler={MKParentPlaceHolder}>
            <DefaultRoute handler={MKPlaceHolder}/>
            <Route name={RouteInfo.aboutUs.name} path={RouteInfo.aboutUs.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.myaccount.name} path={RouteInfo.myaccount.relativePath} handler={MKMyAccountPage}/>
            <Route name={RouteInfo.shop.name} path={RouteInfo.shop.relativePath} handler={MKParentPlaceHolder}>
              <DefaultRoute displayName={RouteInfo.shop.name} handler={MKPlaceHolder}/>
              <Route name={RouteInfo.cart.name} path={RouteInfo.cart.relativePath} handler={MKPlaceHolder}/>
            </Route>
          </Route>

          <Route handler={MKSimplePage}>
            <Route name={RouteInfo.login.name} path={RouteInfo.login.fullPath} handler={MKLoginPage}/>
            <Route name={RouteInfo.pwdRcv.name} path={RouteInfo.pwdRcv.fullPath} handler={MKPasswordRecoveryPage}/>
            <Route name={RouteInfo.register.name} path={RouteInfo.register.fullPath} handler={MKRegisterPage}/>
          </Route>

          {/*Admin dashboard pages*/}
          <Route name={RouteInfo.dashboard.name} path={RouteInfo.dashboard.fullPath} handler={MKParentPlaceHolder}>
            <DefaultRoute handler={MKPlaceHolder}/>
            <Route name={RouteInfo.options.name} path={RouteInfo.options.relativePath} handler={MKOptionsPage}/>
            <Route name={RouteInfo.stats.name} path={RouteInfo.stats.relativePath} handler={MKPlaceHolder}/>
            <Route name={RouteInfo.transaction.name} path={RouteInfo.transaction.relativePath} handler={MKTransactionList}/>
            <Route name={RouteInfo.events.name} path={RouteInfo.events.relativePath} handler={MKParentPlaceHolder}>
              <DefaultRoute displayName={RouteInfo.events.name} handler={MKEventsList}/>
              <Route name={RouteInfo.eventsPos.name} path={RouteInfo.eventsPos.relativePath} handler={MKPlaceHolder}/>
              <Route name={RouteInfo.eventsReport.name} path={RouteInfo.eventsReport.relativePath} handler={MKPlaceHolder}/>
              <Route name={RouteInfo.eventsSignup.name} path={RouteInfo.eventsSignup.relativePath} handler={MKPlaceHolder}/>
            </Route>
            <Route name={RouteInfo.items.name} path={RouteInfo.items.relativePath} handler={MKParentPlaceHolder}>
              <DefaultRoute displayName={RouteInfo.items.name} handler={MKItems}/>
              <Route name={RouteInfo.itemsItemsBelowThreshold.name} path={RouteInfo.itemsItemsBelowThreshold.relativePath} handler={MKItemsBelowThreshold}/>
              <Route name={RouteInfo.itemsNextOrder.name} path={RouteInfo.itemsNextOrder.relativePath} handler={MKPlaceHolder}/>
            </Route>
            <Route name={RouteInfo.mailing.name} path={RouteInfo.mailing.relativePath} handler={MKParentPlaceHolder}>
              <DefaultRoute displayName={RouteInfo.mailing.name} handler={MKPlaceHolder}/>
              <Route name={RouteInfo.mailingSend.name} path={RouteInfo.mailingSend.relativePath} handler={MKMailingListSendPage}/>
              <Route name={RouteInfo.mailingSubscribe.name} path={RouteInfo.mailingSubscribe.relativePath} handler={MKPlaceHolder}/>
            </Route>
            <Route name={RouteInfo.members.name} path={RouteInfo.members.relativePath} handler={MKParentPlaceHolder}>
              <DefaultRoute displayName={RouteInfo.members.name} handler={MKPlaceHolder}/>
              <Route name={RouteInfo.membersPermissions.name} path={RouteInfo.membersPermissions.relativePath} handler={MKUserPrivilegesPage}/>
              <Route name={RouteInfo.volunteerAvailability.name} path={RouteInfo.volunteerAvailability.relativePath} handler={MKVolunteerAvailability}/>
              <Route name={RouteInfo.volunteerSchedule.name} path={RouteInfo.volunteerSchedule.relativePath} handler={MKPlaceHolder}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    );
  }
});

module.exports = MyKoop;
