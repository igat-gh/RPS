require('babel/polyfill');
var testWrapper = require('../support/testsWrapper');
var Settings = require('../../settings');
var Q = require('q');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    function* login(context) {
        var token = yield context.browser.getLocalStorageKey('token');

        if (!token) {
            yield context.browser.setLocalStorageKey('token', Math.random().toString(36).substring(7));
        }
    }

    this.Given('Im in "$module" module', function (module, callback) {

        testWrapper.wrap(this, callback, function* () {
            login(this);
            yield this.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.When('I filter employees by "$Selfeducation"', function (projectType, callback) {

        testWrapper.wrap(this, callback, function* () {
            var filterButton = yield this.browser.waitForElementByClassName('selfeducation-filter');
            yield filterButton.click();
            callback();
        });

    });

    this.Then('I see only employees with "$Selfeducation" type of project at the moment', function (projectType, callback) {

        testWrapper.wrap(this, callback, function* () {
            var projectCells = yield this.browser.waitForElementsByCssSelector('.workload-grid tbody td.project'),
                length = projectCells.length,
                i = 0;

            projectCells.forEach(Q.async(function* (cell) {
                var text = yield cell.text();
                text !== projectType && callback.fail();
                ++i === length && callback();
            }));

        });

    });

};

module.exports = myStepDefinitionsWrapper;