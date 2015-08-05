require('babel/polyfill');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var webdriver = require("selenium-webdriver");

var WorldConstructor = function WorldConstructor(callback) {

    var world = {
        browser: new webdriver.Builder()
            .forBrowser('phantomjs')
            .build()
    };

    callback(world);
};

exports.World = WorldConstructor;
