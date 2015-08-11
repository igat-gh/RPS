var By = require('selenium-webdriver').By;
var Moment = require('moment');
var Q = require('q');
var Until = require('selenium-webdriver').until;

var AsyncWrapper = require('../support/asyncWrapper');
var HtmlElementLocatorService = require('../support/htmlElementLocatorService');
var LoginModule = require('../support/loginModule');
var Settings = require('../../settings');

var WORKLOAD_GRID_EMPLOYEE_ROW = '.workload-grid tbody tr',
    WORKLOAD_GRID_HEADER_ROW = '.workload-grid thead th',
    WORKLOAD_GRID_BODY = '.workload-grid tbody',
    WORKLOAD_GRID_BODY_CELL = '.workload-grid tbody tr td:nth-child({0})';

var employeesWorkloadFilteringWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given('Im in "$module" module', function (module, callback) {
        var self = this;

        LoginModule.login.call(this).then(function () {
            self.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.When('I filter employees by "$projectType" project type', function (projectType, callback) {
        var filterId = HtmlElementLocatorService.getLocator(projectType, 'filter');
        this.browser.findElement(By.id(filterId)).click();
        callback();
    });

    this.When('I filter employees by "$dateFilter" date range', function (dateFilter, callback) {
        var filterId = HtmlElementLocatorService.getLocator(dateFilter, 'filter');
        this.browser.findElement(By.id(filterId)).click();
        callback();
    });

    this.Then('I see only employees with "$projectType" type of project at the moment', function (projectType, callback) {

        AsyncWrapper.wrap(this, callback, function* () {
            yield this.browser.wait(Until.elementLocated(By.css(WORKLOAD_GRID_EMPLOYEE_ROW)), 3000);

            var resultRows = yield this.browser.findElements(By.css(WORKLOAD_GRID_EMPLOYEE_ROW));
            var employeesRowsSelector = WORKLOAD_GRID_BODY + ' .' + HtmlElementLocatorService.getLocator(projectType, 'project-type');
            var employeesRows = yield this.browser.findElements(By.css(employeesRowsSelector));

            if (resultRows.length !== employeesRows.length) {
                callback.fail();
            }
            callback();
        });

    });

    this.Then('I see only employees with "$column" value earlier than "$DateFilter" from now', function (column, DateFilter, callback) {
        AsyncWrapper.wrap(this, callback, function* () {
            var dataString = DateFilter.split(' ');
            var duration = Moment.duration(+dataString[0], dataString[1]);

            yield this.browser.wait(Until.elementLocated(By.css(WORKLOAD_GRID_EMPLOYEE_ROW)), 3000);

            var cellEndSelector = WORKLOAD_GRID_HEADER_ROW + '.' + HtmlElementLocatorService.getLocator(column);
            var cellEndProject = yield this.browser.findElement(By.css(cellEndSelector));
            var cellIndex = yield cellEndProject.getAttribute('cellIndex');
            var cellsWithTimeSelector = HtmlElementLocatorService.getFormattedString(WORKLOAD_GRID_BODY_CELL, +cellIndex + 1);
            var cellsWithTime = yield this.browser.findElements(By.css(cellsWithTimeSelector));

            for (let i = 0; i < cellsWithTime.length; ++i) {
                var cellText = yield cellsWithTime[i].getAttribute('textContent');
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

        AsyncWrapper.wrap(this, callback, function* () {
            var dataString = DateFilter.split(' ');
            var duration = Moment.duration(+dataString[0], dataString[1]);

            yield this.browser.wait(Until.elementLocated(By.css(WORKLOAD_GRID_EMPLOYEE_ROW)), 3000);

            var cellTimeLeftSelector = WORKLOAD_GRID_HEADER_ROW + '.' + HtmlElementLocatorService.getLocator(column);
            var cellTimeLeft = yield this.browser.findElement(By.css(cellTimeLeftSelector));
            var cellIndex = yield cellTimeLeft.getAttribute('cellIndex');
            var cellsWithTimeSelector = HtmlElementLocatorService.getFormattedString(WORKLOAD_GRID_BODY_CELL, +cellIndex + 1);
            var cellsWithTime = yield this.browser.findElements(By.css(cellsWithTimeSelector));

            for (let i = 0; i < cellsWithTime.length; ++i) {
                var cellText = yield cellsWithTime[i].getAttribute('textContent');
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