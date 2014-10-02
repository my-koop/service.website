/*
 * GET home page.
 */
import staticRoot = require('./staticRoot');
import user = require('./user');
import navBar = require('./navBar');
import itemsData = require('./itemsData');

var controllers = {
    staticRoot: staticRoot,
    user: user,
    navBar: navBar,
    itemsData: itemsData
};

export = controllers;
