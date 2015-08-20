var hooks = function () {
    this.World = require('../support/world.js').World;

    this.After(function (callback) {
        this.browser.quit();
        setTimeout(callback, 10);
    });
};

module.exports = hooks;