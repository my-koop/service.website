import utils = require("mykoop-utils");
import routes = require("./routes");
import translations = require("./locales");

var metaData = new utils.MetaData();
routes.addRoutes(metaData);

metaData.addData("translations", translations);

export = metaData;
