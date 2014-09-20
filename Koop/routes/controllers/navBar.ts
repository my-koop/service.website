import express = require('express');

function NavBar(req: express.Request, res: express.Response) {
    var links = { links: [new Link('Index', 'app'), new Link('Users', 'users')] };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(links));
};

export = NavBar;

class Link {
    constructor(public name: string, public url: string) {
    }
}
