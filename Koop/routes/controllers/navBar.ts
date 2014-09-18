import express = require('express');

function NavBar(req: express.Request, res: express.Response) {
    
    var links = { links: [new Link('Index', '/'), new Link('Users', '/users')] };
    if (req.query.path !== undefined) {

    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(links));
};

export = NavBar;

class Link {
    constructor(public name: string, public url: string) {
    }
}
