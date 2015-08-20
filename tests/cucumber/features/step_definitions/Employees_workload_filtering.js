var By = require('selenium-webdriver').By;
var Moment = require('moment');
var Until = require('selenium-webdriver').until;

module.exports = function () {
    this.World = require('../support/World.js').World;

    /**
     * Selectors to be used for accessing DOM elements
     */
    var WORKLOAD_GRID_ID = 'workload-grid',
        WORKLOAD_GRID_HEADER_ROW = '#workload-grid thead th',
        WORKLOAD_GRID_EMPLOYEE_ROW = '#workload-grid tbody tr',
        WORKLOAD_GRID_BODY_CELL = '#workload-grid tbody tr td:nth-child({0})';

    this.Given('I am logged in as "$userName"', function (userName) {
        this.browser.get(Settings.baseUrl + 'login');
        return this.browser.findElement(By.id('btn-login')).click();
    });

    this.Given('I am in "$module" module', function (module) {
        return this.browser.get(Settings.baseUrl + module);
    });

    this.Given('I see table of employees', function () {
        var self = this,
            locator = By.id(WORKLOAD_GRID_ID);

        return this.browser.wait(function() {
            return self.browser.isElementPresent(locator);
        }, 3000);
    });

    this.When('I filter employees by "$projectType" project type', function (projectType) {
        var filterId = this.elementLocator.getLocator(projectType, 'filter');
        return this.browser.findElement(By.id(filterId)).click();
    });

    this.When('I filter employees by "$dateFilter" date range', function (dateFilter) {
        var filterId = this.elementLocator.getLocator(dateFilter, 'filter');
        return this.browser.findElement(By.id(filterId)).click();
    });

    this.Then('I see only employees with "$projectType" type of project at the moment', function (projectType) {
        var self = this,
            employeesGridLocator = By.css(WORKLOAD_GRID_EMPLOYEE_ROW),
            employeesRowsLocator = By.css(WORKLOAD_GRID_EMPLOYEE_ROW + this.elementLocator.getLocator(projectType, '.project-type'));

        this.browser.wait(function() {
            return self.browser.isElementPresent(employeesGridLocator);
        }, 3000);

        return Promise.all([this.browser.findElements(employeesGridLocator), this.browser.findElements(employeesRowsLocator)])
        .then(function(values) {
            return expect(values[0].length).to.equal(values[1].length);
        });
    });

    this.Then('I see only employees with "$column" value earlier than "$dateFilter" from now', function (column, dateFilter) {
        var self = this,
            duration = Moment.durationFromHumanizedString(dateFilter),
            currentDate = Moment(),
            dateColumnLocator = By.css(WORKLOAD_GRID_HEADER_ROW + '.' + this.elementLocator.getLocator(column));
        
        this.browser.wait(function() {
            return self.browser.isElementPresent(dateColumnLocator);
        }, 3000);
        
        return this.browser.findElement(dateColumnLocator).getAttribute('cellIndex').then(function(cellIndex) {
            self.browser.findElements(By.css(String.format(WORKLOAD_GRID_BODY_CELL, +cellIndex + 1))).then(function(dateCells) {
                dateCells.forEach(function(element) {
                    element.getText().then(function(dateValue) {
                        var projectEndDate = new Date(dateValue),
                            diff = Moment.duration(projectEndDate - currentDate);
                        expect(diff).to.be.below(duration);
                    });
                });
            });
        });
    });

    this.Then('I see only employees with "$column" value no more than "$dateFilter"', function (column, dateFilter) {
        var self = this,
            duration = Moment.durationFromHumanizedString(dateFilter),
            dateColumnLocator = By.css(WORKLOAD_GRID_HEADER_ROW + '.' + this.elementLocator.getLocator(column));
        
        this.browser.wait(function() {
            return self.browser.isElementPresent(dateColumnLocator);
        }, 3000);
        
        return this.browser.findElement(dateColumnLocator).getAttribute('cellIndex').then(function(cellIndex) {
            self.browser.findElements(By.css(String.format(WORKLOAD_GRID_BODY_CELL, +cellIndex + 1))).then(function(dateCells) {
                dateCells.forEach(function(element, index, array) {
                    element.getText().then(function(timeLeftValue) {
                        var projectTimeLeftArray = timeLeftValue.toUpperCase().split(' '),
                            projectTimeLeft = 0;
                        projectTimeLeftArray.forEach(function(element) {
                            projectTimeLeft += Moment.duration('P' + element);
                        });
                        expect(projectTimeLeft).to.be.below(duration);
                    });
                });
            });
        });
    });
};