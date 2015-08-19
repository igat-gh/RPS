var By = require('selenium-webdriver').By;
var Expect = require('selenium-webdriver').until;

module.exports = function () {
	this.World = require('../support/World.js').World;
	
	/**
	 * Selectors to be used for accessing DOM elements
	 */
	var WORKLOAD_GRID_ID = 'workload-grid',
		WORKLOAD_GRID_ROW_SELECTOR = '#workload-grid tr';

    this.Given('I\'m logged in as "$userName"', function (userName, callback) {
		this.browser.get(Settings.baseUrl + 'login');
		return this.browser.findElement(By.id('btn-login')).click();
    });

    this.When('I navigate to "$module" module', function (module) {
        return this.browser.get(Settings.baseUrl + module);
    });

    this.Then('I see table of employees', function () {
		var self = this,
			locator = By.id(WORKLOAD_GRID_ID);

		return this.browser.wait(function() {
			return self.browser.isElementPresent(locator);
		}, 3000);
    });

    this.Then('table contains columns', function () {
		return expect(this.browser.findElements(By.css(WORKLOAD_GRID_ROW_SELECTOR))).to.eventually.not.be.empty;
    });
};