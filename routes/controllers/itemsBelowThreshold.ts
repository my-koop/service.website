import express = require("express");
import routeInfo = require("../../modules/common/routeInformation");
import definitions = require("../../modules/common/itemsThreshold");

var muckData = [
  new definitions.Item("Item 1", "154896", 5, 10),
  new definitions.Item("Item 2", "125487", 0, 1),
  new definitions.Item("Item 3", "845632", 2, 20),
  new definitions.Item("Item 4", "485965", 8, 15),
  new definitions.Item("Item 5", "478512", 64, 100),
  new definitions.Item("Item 6", "658234", 1, 3),
  new definitions.Item("Item 7", "485165", 5, 6),
  new definitions.Item("Item 8", "874953", 3, 4),
  new definitions.Item("Item 9", "485964", 0, 7),
  new definitions.Item("Item 10", "786425", 1, 2),
];

function ItemsBelowThreshold(req: express.Request, res: express.Response) {

  res.json({
    headers: definitions.Item.ITEMS_HEADER,
    data: muckData
  });
};

export = ItemsBelowThreshold;


