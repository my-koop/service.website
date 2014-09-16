import express = require('express');


export function NavBar(req: express.Request, res: express.Response) {
    
    var links = { links: [new Link('Index', '/'), new Link('Users', '/users')] };
    if (req.body.path !== undefined) {

    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(links));
};

export var Url = "/GetNavBar";

class Link {
    constructor(public mName: string, public mUrl: string) {
    }
}
