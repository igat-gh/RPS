require('babel/polyfill');

var Webdriver = require("selenium-webdriver");

var WorldConstructor = function WorldConstructor(callback) {

    var world = {
        browser: new Webdriver.Builder()
            .forBrowser('phantomjs')
            .build()
    };

    callback(world);
};

exports.World = WorldConstructor;
