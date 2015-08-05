var asyncWrapper = require('../support/asyncWrapper');
var Settings = require('../../settings');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

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
            var browser = this.browser;
            var workloadGrid = this.browser.wait(function () {
                return browser.isElementPresent(By.className('workload-grid'));
            }, 2000);

            if (workloadGrid) {
                callback();
            } else {
                callback.fail('Find workload table fail ' + err);
            }

        });

    });

    this.Then(/^table contains columns$/, function (callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var workloadGrid = this.browser.findElement(By.className('workload-grid'));

            if (workloadGrid) {
                var rows = yield workloadGrid.findElements(By.tagName('tr'));

                if (rows.slice().length) {
                    callback();
                } else {
                    callback.fail();
                }

            }

        });
        
    });

};

module.exports = myStepDefinitionsWrapper;