import express = require('express');
import routeInfo = require('../../Scripts/modules/routeInformation');

function NavBar(req: express.Request, res: express.Response) {
  var allLinks = []
  for (var i = 0; i < routeInfo.frontEndPages.length; ++i) {
    var route = routeInfo.frontEndPages[i];
    allLinks.push(new Link(route.name, route.fullPath));
  }
  var links = {
    links: allLinks
  };

  res.json(links);
};

export = NavBar;

class Link {
  constructor(public name: string, public url: string) {
  }
}
