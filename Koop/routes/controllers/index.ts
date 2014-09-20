/*
 * GET home page.
 */
import staticRoot = require('./staticRoot');
import user = require('./user');
import navBar = require('./navBar');

var controllers = {
    staticRoot: staticRoot,
    user: user,
    navBar: navBar
};

export = controllers;
