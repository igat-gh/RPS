require('babel/polyfill');
var Q = require('q');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    var wrapTest = function (context, callback, fn) {
        var promise = Q.async(function(){
            return fn.call(context);
        });

        promise().catch(function (err) {
            callback.fail(err);
        });

    };

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {

        wrapTest(this, callback, function* () {
            yield this.browser.get('http://localhost:3000/#/login');
            var emailInput = yield this.browser.elementById('auth-email-input');
            var passwordInput = yield this.browser.elementById('auth-password-input');
            emailInput.value = 'example@email.com';
            passwordInput.value = 'password';
            var loginButton = this.browser.elementByClassName('login-btn');
            yield loginButton.click();
            callback();
        });

    });

    this.When('I navigate to "$module" module', function (module, callback) {

        wrapTest(this, callback, function* () {
            yield this.browser.get('http://localhost:3000/#/' + module);
            callback();
        });

    });

    this.Then(/^I see table of employees$/, function (callback) {

        wrapTest(this, callback, function* () {
            var workloadGrid = yield this.browser.waitForElementByClassName('workload-grid');

            if (workloadGrid) {
                callback();
            } else {
                callback.fail('Find workload table fail ' + err);
            }

        });

    });

    this.Then(/^table contains columns$/, function (callback) {

        wrapTest(this, callback, function* () {
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