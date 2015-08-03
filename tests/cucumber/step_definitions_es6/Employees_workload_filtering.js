var Q = require('q');
var loginModule = require('../support/loginModule');
var asyncWrapper = require('../support/asyncWrapper');
var Settings = require('../../settings');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given('Im in "$module" module', function (module, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            yield loginModule.login.call(this);
            yield this.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.When('I filter employees by "$filter"', function (filter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var id = filter.toLowerCase().replace(/\s*/g,'') + '-filter';
            var filterButton = yield this.browser.waitForElementById(id);
            yield filterButton.click();
            callback();
        });

    });

    this.Then('I see only employees with "$filter" type of project at the moment', function (filter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var projectCells = yield this.browser.waitForElementsByCssSelector('.workload-grid tbody td.project'),
                length = projectCells.length,
                i = 0;

            projectCells.forEach(Q.async(function* (cell) {
                var text = yield cell.text();
                text !== filter && callback.fail();
                ++i === length && callback();
            }));

        });

    });

};

module.exports = myStepDefinitionsWrapper;