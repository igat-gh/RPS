var Moment = require('moment');
var Q = require('q');
require('moment-duration-format');

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

    this.When('I filter employees by "$filter" with selector "$selector"', function (filter, HTMLSelector, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var filterButton = yield this.browser.waitForElementById('filter-' + HTMLSelector);
            yield filterButton.click();
            callback();
        });

    });

    this.Then('I see only employees with "$filter" type of project at the moment with selector "$HTMLSelector"', function (filter, HTMLSelector, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var resultRows = yield this.browser.waitForElementsByCssSelector('.workload-grid tbody tr');
            var employeesRows = yield this.browser.waitForElementsByCssSelector('.workload-grid tbody .project-type-' + HTMLSelector);

            resultRows.length === employeesRows.length && callback.fail();
            callback();

        });

    });

    this.Then('I see only those employees whose time the project is completed at "$filter" and equal filter "$URLFilter"', function (filter, URLFilter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var self = this;
            var cellEndProject = yield this.browser.waitForElementsByCssSelector('.workload-grid thead tr th.end-project');
            var cellIndex = yield this.browser.getAttribute(cellEndProject, 'cellIndex');
            var cellsWithTime = yield this.browser.waitForElementsByCssSelector('.workload-grid tbody tr td:nth-child(' + (+cellIndex + 1) + ')');

            for ( let i = 0; i < cellsWithTime.length; ++i ) {
                var cellText = yield self.browser.getAttribute(cellsWithTime[i], 'innerHTML');
                var projectEndDate = +new Date(cellText);
                var diff = Moment.duration(projectEndDate - Moment());
                var duration = Moment.duration(URLFilter);

                if (diff >= duration) {
                    callback.fail();
                    break;
                }
            }
            callback();
        });

    });

};

module.exports = myStepDefinitionsWrapper;