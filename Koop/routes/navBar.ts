import express = require('express');

import app = require('app');
import NavBarInfo = require('Scripts/modules/NavBarInfo');

app.AddRoute(NavBarInfo.Url, NavBar);
function NavBar(req: express.Request, res: express.Response) {
    
    var links = { links: [new Link('Index', '/'), new Link('Users', '/users')] };
    if (req.body.path !== undefined) {

    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(links));
};

class Link {
    constructor(public mName: string, public mUrl: string) {
    }
}
