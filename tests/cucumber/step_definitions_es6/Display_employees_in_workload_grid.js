var asyncWrapper = require('../support/asyncWrapper');
var Settings = require('../../settings');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {
        this.browser.get(Settings.baseUrl + 'login');
        this.browser.findElement(By.id('auth-email-input')).sendKeys(Settings.adminCredentials.login);
        this.browser.findElement(By.id('auth-password-input')).sendKeys(Settings.adminCredentials.password);
        this.browser.findElement(By.className('login-btn')).click();
        callback();
    });

    this.When('I navigate to "$module" module', function (module, callback) {
        this.browser.get(Settings.baseUrl + module);
        callback();
    });

    this.Then(/^I see table of employees$/, function (callback) {

        asyncWrapper.wrap(this, callback, function* () {
            yield this.browser.wait(until.elementLocated(By.className('workload-grid')), 3000);
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