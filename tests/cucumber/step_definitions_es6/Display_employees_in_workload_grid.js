var By = require('selenium-webdriver').By;
var Q = require('q');
var Until = require('selenium-webdriver').until;

var AsyncWrapper = require('../support/asyncWrapper');
var LoginModule = require('../support/loginModule');
var Settings = require('../../settings');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {

        LoginModule.login.call(this).then(function () {
            callback();
        });

    });

    this.When('I navigate to "$module" module', function (module, callback) {
        this.browser.get(Settings.baseUrl + module);
        callback();
    });

    this.Then(/^I see table of employees$/, function (callback) {

        AsyncWrapper.wrap(this, callback, function* () {
            yield this.browser.wait(Until.elementLocated(By.className('workload-grid')), 3000);
            callback();
        });

    });

    this.Then(/^table contains columns$/, function (callback) {

        this.browser.findElements(By.css('.workload-grid  tr')).then(function (rows) {

            if (rows.length) {
                callback();
            } else {
                callback.fail();
            }

        });

    });

};

module.exports = myStepDefinitionsWrapper;