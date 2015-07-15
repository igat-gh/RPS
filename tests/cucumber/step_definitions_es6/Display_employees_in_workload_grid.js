require('babel/polyfill');
var Q = require('q');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    var wrapTest = function (fn) {
        Q.async(fn)();
    };

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {
        var self = this;

        wrapTest(function* () {

            try {
                yield self.browser.get('http://localhost:3000/#/login');
                var emailInput = yield self.browser.elementById('auth-email-input');
                var passwordInput = yield self.browser.elementById('auth-password-input');
                emailInput.value = 'example@email.com';
                passwordInput.value = 'password';
                var loginButton = self.browser.elementByClassName('login-btn');
                yield loginButton.click();
                callback();
            } catch (error) {
                callback.fail(error);
            }

        });

    });

    this.When('I navigate to "$module" module', function (module, callback) {
        var self = this;

        wrapTest(function* () {

            try {
                yield self.browser.get('http://localhost:3000/#/' + module);
                callback();
            } catch (error) {
                callback.fail('Navigate to ' + module + ' fail ' + err);
            }

        });

    });

    this.Then(/^I see table of employees$/, function (callback) {
        var self = this;

        wrapTest(function* () {

            try {
                var workloadGrid = yield self.browser.waitForElementByClassName('workload-grid');

                if (workloadGrid) {
                    callback();
                } else {
                    callback.fail('Find workload table fail ' + err);
                }

            } catch (error) {
                callback.fail('Find workload table fail ' + error);
            }

        });

    });

    this.Then(/^table contains columns$/, function (callback) {
        var self = this;

        wrapTest(function* () {
            try {
                var workloadGrid = yield self.browser.elementByClassName('workload-grid');

                if (workloadGrid) {
                    var rows = yield workloadGrid.elementsByCssSelector('tr');

                    if (rows.slice().length) {
                        callback();
                    } else {
                        callback.fail();
                    }

                }

            } catch (error) {
                callback.fail('Find workload table rows fail ' + err);
            }
        });

    });

};

module.exports = myStepDefinitionsWrapper;