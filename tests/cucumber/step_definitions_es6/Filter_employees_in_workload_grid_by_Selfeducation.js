var Q = require('q');
//var loginModule = require('../support/loginModule');
var asyncWrapper = require('../support/asyncWrapper');
var Settings = require('../../settings');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given('Im in "$module" module', function (module, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            //yield loginModule.login.call(this);
            this.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.When('I filter employees by "$Selfeducation"', function (projectType, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var filterButton = this.browser.findElement(By.id('selfeducation-filter'));
            filterButton.click();
            callback();
        });

    });

    this.Then('I see only employees with "$Selfeducation" type of project at the moment', function (projectType, callback) {

        asyncWrapper.wrap(this, callback, function* () {
            var browser = this.browser;

            yield this.browser.wait(function *() {
                var isPresent = yield browser.isElementPresent(By.css('.workload-grid tbody td.project'));
                return isPresent;
            }, 2000);

            var projectCells = yield this.browser.findElements(By.css('.workload-grid tbody td.project')),
                length = projectCells.length,
                i = 0;

            projectCells.forEach(Q.async(function* (cell) {
                var text = yield cell.getText();
                text !== projectType && callback.fail();
                ++i === length && callback();
            }));

        });

    });

};

module.exports = myStepDefinitionsWrapper;