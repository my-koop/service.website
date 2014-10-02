/*
 * GET home page.
 */
import staticRoot = require('./staticRoot');
import user = require('./user');
import navBar = require('./navBar');
import itemsThreshold = require('./itemsBelowThreshold');
import itemsData = require('./itemsData');

var controllers = {
    staticRoot: staticRoot,
    user: user,
    navBar: navBar,
    itemsThreshold: itemsThreshold,
    itemsData: itemsData
};

export = controllers;
