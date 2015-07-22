require('babel/polyfill');
var testWrapper = require('../support/testsWrapper');
var Settings = require('../../settings');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {

        testWrapper.wrap(this, callback, function* () {
            yield this.browser.get(Settings.baseUrl + 'login');
            var emailInput = yield this.browser.elementById('auth-email-input');
            var passwordInput = yield this.browser.elementById('auth-password-input');
            emailInput.value = Settings.adminCredentials.login;
            passwordInput.value = Settings.adminCredentials.password;
            var loginButton = this.browser.elementByClassName('login-btn');
            yield loginButton.click();
            callback();
        });

    });

    this.When('I navigate to "$module" module', function (module, callback) {

        testWrapper.wrap(this, callback, function* () {
            yield this.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.Then(/^I see table of employees$/, function (callback) {

        testWrapper.wrap(this, callback, function* () {
            var workloadGrid = yield this.browser.waitForElementByClassName('workload-grid');

            if (workloadGrid) {
                callback();
            } else {
                callback.fail('Find workload table fail ' + err);
            }

        });

    });

    this.Then(/^table contains columns$/, function (callback) {

        testWrapper.wrap(this, callback, function* () {
            var workloadGrid = yield this.browser.elementByClassName('workload-grid');

            if (workloadGrid) {
                var rows = yield workloadGrid.elementsByCssSelector('tr');

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