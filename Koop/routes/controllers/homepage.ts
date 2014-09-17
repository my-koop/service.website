/*
 * GET home page.
 */
import express = require('express');

function homepage(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express' });
};

export = homepage;
