import express = require("express");
import moduleManager = require("../../modules/backend/moduleManager");
import _ = require("lodash");
import utils = require("mykoop-utils");
var logger = utils.getLogger(module);

class Link {
  constructor(
    public name: string,
    public params: any,
    public query: any,
    public url: string
  ) {
  }
}


// From http://stackoverflow.com/a/15643382/564163
function findNested(obj, key, memo?) {
  _.isArray(memo) || (memo = []);
  _.forOwn(obj, function(val, i) {
    if (i === key) {
      memo.push(obj);
    } else {
      findNested(val, key, memo);
    }
  });
  return memo;
}

var devNavBarLinks = [];

// Map all possible static routes/route patterns.
moduleManager.getMetaData(function (err, metaDataResult) {
  var allRoutes = findNested(metaDataResult.routes, "name");
  _.each(allRoutes,
    function (obj: any) {
      logger.silly("devNavBar link", obj);
      if(obj.params || obj.query) {
        var paramsOptions = _.keys(obj.params);
        var queryOptions = _.keys(obj.query);
        logger.debug("route with params and/or queries %j", obj);

        function getCombinaisons(src, i) {
          // Default case
          if(i >= src.length) {
            return [[]];
          }

          var result = [];
          var arr = _.toArray(src[i]);
          // merge arrays together
          // ie: next = [["e"],["f"]];
          //     arr = [["c"],["d"]];
          // result = [["c","e"],
          //           ["c","f"],
          //           ["d","e"],
          //           ["d","f"]]
          var next = getCombinaisons(src, i + 1);
          _.each(arr, function(elem) {
            _.each(next, function(n) {
              // order is important for zipping in the end
              var r = [elem].concat(n);
              result.push(r);
            });
          });
          return result;
        }
        // get combinaisons for all params and queries
        var result = getCombinaisons(_.toArray(obj.params).concat(_.toArray(obj.query)), 0);
        var iParam = paramsOptions.length;
        logger.debug("All possible routes", result);
        // from the result, create all possible routes
        _.each(result, function(options) {
          // separate the array back for params and options
          var params = options.slice(0, iParam);
          var queries = options.slice(iParam);
          // Create a link
          devNavBarLinks.push(new Link(
            // Display name to know where this leads
            obj.name + ";" + options.join(";"),
            // Make params from this option
            _.zipObject(paramsOptions, params),
            // Make queries from this option
            _.zipObject(queryOptions, queries),
            // This is the route name used by react-router
            obj.name
          ));
        });
        return;
      }
      devNavBarLinks.push(new Link(obj.name, null, null, obj.name));
    }

  );
});

function NavBar(req: express.Request, res: express.Response) {
  res.json({
    links: devNavBarLinks
  });
};

export = NavBar;
