/*
 * GET users listing.
 */
import express = require('express');

function list(req: express.Request, res: express.Response) {
    res.send("respond with a resource");
};

export = list;