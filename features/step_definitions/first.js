var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {
        var self = this;
        this.browser.get('http://localhost:3000/#/login').then(function () {

            self.browser.elementById('auth-email-input').then(function (el) {
                el.value = 'example@email.com';

                self.browser.elementById('auth-password-input').then(function (el) {
                    el.value = 'password';

                    self.browser.elementByClassName('login-btn').then(function (el) {

                        el.click().then(function () {
                            callback();
                        }).fail(function (err) {
                            console.log('Click login button fail ' + err);
                        });

                    }).fail(function (err) {
                        console.log('Find login button fail ' + err);
                    });

                }).fail(function (err) {
                    console.log('Find password input fail ' + err);
                });

            }).fail(function (err) {
                console.log('Find email input fail ' + err);
            });

        }).fail(function (err) {
            console.log('Navigate to login fail ' + err);
        });
    });

    this.When('I navigate to "$module" module', function (module, callback) {
        this.browser.get('http://localhost:3000/#/' + module).then(function () {
            callback();
        }).fail(function (err) {
            console.log('Navigate to ' + module + ' fail ' + err);
        });
    });

    this.Then(/^I see table of employees$/, function (callback) {
        var self = this;

        this.browser.setImplicitWaitTimeout(3000, function () {
            self.browser.elementByClassName('workload-grid').then(function (el) {
                if (el) {
                    callback();
                } else {
                    callback.fail();
                }
            }).fail(function (err) {
                console.log('Find workload table fail ' + err);
            });
        });

    });

    this.Then(/^table contains columns$/, function (callback) {
        this.browser.elementByClassName('workload-grid').then(function (el) {
            if (el) {
                el.elementsByCssSelector('tr').then(function (rows) {
                    if (rows.slice().length) {
                        console.log('Rows find ' + rows.slice().length);
                        callback();
                    } else {
                        callback.fail();
                    }
                });
            } else {
                callback.fail();
            }
        }).fail(function (err) {
            console.log('Find workload table rows fail ' + err);
        });
    });
};
module.exports = myStepDefinitionsWrapper;