import express = require("express");
import moduleManager = require("../../modules/backend/moduleManager");
import _ = require("lodash");

class Link {
  constructor(public name: string, public url: string) {
  }
}


// From http://stackoverflow.com/a/15643382/564163
function findNested(obj, key, memo?) {
  _.isArray(memo) || (memo = []);
  _.forOwn(obj, function(val, i) {
    if (i === key) {
      memo.push(val);
    } else {
      findNested(val, key, memo);
    }
  });
  return memo;
}

var devNavBarLinks = [];

// Map all possible static routes/route patterns.
moduleManager.getMetaData(function (err, metaDataResult) {
  devNavBarLinks = findNested(metaDataResult, "name").map(
    function (name) {
      return new Link(name, name);
    }
  );
});

function NavBar(req: express.Request, res: express.Response) {
  res.json({
    links: devNavBarLinks
  });
};

export = NavBar;
