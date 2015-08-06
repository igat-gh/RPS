var Moment = require('moment');
var Q = require('q');
require('moment-duration-format');

var asyncWrapper = require('../support/asyncWrapper');
var cssConverter = require('../support/cssConverter');
var loginModule = require('../support/loginModule');
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

    this.When('I filter employees by "$ProjectType" project type', function (ProjectType, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var HTMLSelector = cssConverter.getCssString(ProjectType);
            var filterButton = yield this.browser.waitForElementById('filter-' + HTMLSelector);
            yield filterButton.click();
            callback();
        });

    });

    this.When('I filter employees by "$DateFilter" date range', function (DateFilter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var HTMLSelector = cssConverter.getCssString(DateFilter);
            var filterButton = yield this.browser.waitForElementById('filter-' + HTMLSelector);
            yield filterButton.click();
            callback();
        });

    });

    this.Then('I see only employees with "$ProjectType" type of project at the moment', function (ProjectType, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var HTMLSelector = cssConverter.getCssString(ProjectType);
            var resultRows = yield this.browser.waitForElementsByCssSelector('.workload-grid tbody tr');
            var employeesRows = yield this.browser.waitForElementsByCssSelector('.workload-grid tbody .project-type-' + HTMLSelector);

            resultRows.length === employeesRows.length && callback.fail();
            callback();

        });

    });

    this.Then('I see only employees with "$column" value earlier than "$DateFilter" from now', function (column, DateFilter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var self = this;

            var filterButton = yield this.browser.waitForElementById('filter-' + cssConverter.getCssString(DateFilter));
            var URL = yield this.browser.getAttribute(filterButton, 'href');
            var URLFilter = URL.split('/TYPE_TIME/')[1];

            var cellEndProject = yield this.browser.waitForElementsByCssSelector('.workload-grid thead tr th.' + cssConverter.getCssString(column));
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