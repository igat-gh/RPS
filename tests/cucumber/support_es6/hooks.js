var Settings = require('../../settings');
var asyncWrapper = require('../support/asyncWrapper');

var hooks = function () {
    this.World = require('../support/world.js').World;

    this.After(function (callback) {

        asyncWrapper.wrap(this, callback, function* () {
           // yield this.browser.get(Settings.baseUrl);
           // yield this.browser.clearLocalStorage();
            this.browser.quit();
            setTimeout(callback, 0);
        });

    });

};

module.exports = hooks;