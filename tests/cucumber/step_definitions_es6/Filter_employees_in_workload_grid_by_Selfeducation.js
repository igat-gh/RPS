var Q = require('q');
var loginModule = require('../support/loginModule');
var testWrapper = require('../support/testWrapper');
var Settings = require('../../settings');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given('Im in "$module" module', function (module, callback) {

        testWrapper.wrap(this, callback, function* () {
            yield loginModule.login.call(this);
            yield this.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.When('I filter employees by "$Selfeducation"', function (projectType, callback) {

        testWrapper.wrap(this, callback, function* () {
            var filterButton = yield this.browser.waitForElementById('selfeducation-filter');
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