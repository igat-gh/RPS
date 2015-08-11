var Moment = require('moment');
var Q = require('q');

var asyncWrapper = require('../support/asyncWrapper');
var htmlElementLocatorService = require('../support/htmlElementLocatorService');
var loginModule = require('../support/loginModule');
var settings = require('../../settings');

var employeesWorkloadFilteringWrapper = function () {
    this.World = require('../support/world.js').World;

    var WORKLOAD_GRID_EMPLOYEE_ROW = '.workload-grid tbody tr',
        WORKLOAD_GRID_HEADER_ROW = '.workload-grid thead th',
        WORKLOAD_GRID_BODY = '.workload-grid tbody',
        WORKLOAD_GRID_BODY_CELL = '.workload-grid tbody tr td:nth-child({0})';

    this.Given('Im in "$module" module', function (module, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            yield loginModule.login.call(this);
            yield this.browser.get(settings.baseUrl + module);
            callback();
        });

    });

    this.When('I filter employees by "$ProjectType" project type', function (ProjectType, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var filterButton = yield this.browser.waitForElementById(htmlElementLocatorService.getLocator(ProjectType, 'filter' ));
            yield filterButton.click();
            callback();
        });

    });

    this.When('I filter employees by "$DateFilter" date range', function (DateFilter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var filterButton = yield this.browser.waitForElementById(htmlElementLocatorService.getLocator(DateFilter, 'filter'));
            yield filterButton.click();
            callback();
        });

    });

    this.Then('I see only employees with "$ProjectType" type of project at the moment', function (ProjectType, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var resultRows = yield this.browser.waitForElementsByCssSelector(WORKLOAD_GRID_EMPLOYEE_ROW);
            var employeesRows = yield this.browser.waitForElementsByCssSelector(WORKLOAD_GRID_BODY + ' .' + htmlElementLocatorService.getLocator(ProjectType, 'project-type'));

            if(resultRows.length !== employeesRows.length) {
                callback.fail();
            }
            callback();

        });

    });

    this.Then('I see only employees with "$column" value earlier than "$DateFilter" from now', function (column, DateFilter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var dataString = DateFilter.split(' ');
            var duration = Moment.duration(+dataString[0], dataString[1]);

            var cellEndProject = yield this.browser.waitForElementsByCssSelector(WORKLOAD_GRID_HEADER_ROW + '.' + htmlElementLocatorService.getLocator(column));
            var cellIndex = yield this.browser.getAttribute(cellEndProject, 'cellIndex');
            var cellsWithTime = yield this.browser.waitForElementsByCssSelector(htmlElementLocatorService.getFormattedString(WORKLOAD_GRID_BODY_CELL, +cellIndex + 1));

            for (let i = 0; i < cellsWithTime.length; ++i) {
                var cellText = yield this.browser.getAttribute(cellsWithTime[i], 'textContent');
                var projectEndDate = +new Date(cellText);
                var diff = Moment.duration(projectEndDate - Moment());

                if (diff >= duration) {
                    callback.fail();
                    break;
                }
            }
            callback();
        });

    });

    this.Then('I see only employees with "$column" value no more than "$DateFilter"', function (column, DateFilter, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var dataString = DateFilter.split(' ');
            var duration = Moment.duration(+dataString[0], dataString[1]);

            var cellTimeLeft = yield this.browser.waitForElementsByCssSelector(WORKLOAD_GRID_HEADER_ROW + '.' + htmlElementLocatorService.getLocator(column));
            var cellIndex = yield this.browser.getAttribute(cellTimeLeft, 'cellIndex');
            var cellsWithTime = yield this.browser.waitForElementsByCssSelector(htmlElementLocatorService.getFormattedString(WORKLOAD_GRID_BODY_CELL, +cellIndex + 1));

            for (let i = 0; i < cellsWithTime.length; ++i) {
                var cellText = yield this.browser.getAttribute(cellsWithTime[i], 'textContent');
                var timeLeftArr = cellText.toUpperCase().split(' ');
                var timeLeft = 0;

                for (let j = 0; j < timeLeftArr.length; ++j) {
                    timeLeft += Moment.duration('P' + timeLeftArr[j]);
                }

                if (timeLeft >= duration) {
                    callback.fail();
                    break;
                }
            }
            callback();
        });

    });


};

module.exports = employeesWorkloadFilteringWrapper;