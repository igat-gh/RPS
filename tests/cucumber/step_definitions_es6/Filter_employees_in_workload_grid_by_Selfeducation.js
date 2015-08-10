var By = require('selenium-webdriver').By;
var Q = require('q');
var Until = require('selenium-webdriver').until;

var AsyncWrapper = require('../support/asyncWrapper');
var LoginModule = require('../support/loginModule');
var Settings = require('../../settings');

var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given('Im in "$module" module', function (module, callback) {
        var self = this;

        LoginModule.login.call(this).then(function () {
            self.browser.get(Settings.baseUrl + module);
            callback();
        });

    });

    this.When('I filter employees by "$Selfeducation"', function (projectType, callback) {
        this.browser.findElement(By.id('selfeducation-filter')).click();
        callback();
    });

    this.Then('I see only employees with "$Selfeducation" type of project at the moment', function (projectType, callback) {

        AsyncWrapper.wrap(this, callback, function* () {
            yield this.browser.wait(Until.elementLocated(By.css('.workload-grid tbody td.project')), 3000);

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