require('babel/polyfill');
require('moment');
require('../utils/StringExtensions');
require('../utils/MomentExtensions');

GLOBAL.Webdriver = require('selenium-webdriver');
GLOBAL.Chai = require('chai');
GLOBAL.ChaiAsPromised = require('chai-as-promised');

Chai.use(ChaiAsPromised);

GLOBAL.expect = Chai.expect;

GLOBAL.Settings = require('../Settings');

var HtmlElementLocatorService = require('../utils/HtmlElementLocatorService');

var WorldConstructor = function WorldConstructor(callback) {

	var world = {
        browser: new Webdriver.Builder()
					.forBrowser('phantomjs')
					.build(),
		elementLocator: HtmlElementLocatorService
    };
    callback(world);
};

exports.World = WorldConstructor;