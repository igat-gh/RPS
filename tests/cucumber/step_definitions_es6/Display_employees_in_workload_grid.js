var asyncWrapper = require('../support/asyncWrapper');
var Settings = require('../../settings');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;
var Q = require('q');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {

        asyncWrapper.wrap(this, callback, function* () {
            this.browser.get(Settings.baseUrl + 'login');
            var emailInput = this.browser.findElement(By.id('auth-email-input'));
            var passwordInput = this.browser.findElement(By.id('auth-password-input'));
            emailInput.value = Settings.adminCredentials.login;
            passwordInput.value = Settings.adminCredentials.password;
            var loginButton = this.browser.findElement(By.className('login-btn'));
            loginButton.click();
            callback();
        });

    });

    this.When('I navigate to "$module" module', function (module, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            this.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.Then(/^I see table of employees$/, function (callback) {

        asyncWrapper.wrap(this, callback, function* () {
            yield this.browser.wait(until.elementLocated(By.className('workload-grid')), 3000);
            callback();
        });

    });

    this.Then(/^table contains columns$/, function (callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var workloadGrid = this.browser.findElement(By.className('workload-grid'));

            if (workloadGrid) {
                var rows = yield workloadGrid.findElements(By.tagName('tr'));
                if (rows.length) {
                    callback();
                } else {
                    callback.fail();
                }

            }

        });

    });

};

module.exports = myStepDefinitionsWrapper;