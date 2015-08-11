var AsyncWrapper = require('../support/asyncWrapper');
var Settings = require('../../settings');

var hooks = function () {
    this.World = require('../support/world.js').World;

    this.After(function (callback) {

        AsyncWrapper.wrap(this, callback, function* () {
            this.browser.get(Settings.baseUrl);
            yield this.browser.executeScript('localStorage.clear();');
            this.browser.quit();
            setTimeout(callback, 0);
        });

    });

};

module.exports = hooks;