'use strict';
var Settings = require('../../settings');

var hooks = function () {
    this.World = require('../support/world.js').World;

    this.After(function (callback) {
        var self = this;

        this.browser.get(Settings.baseUrl).then(function () {

            self.browser.clearLocalStorage().then(function () {
                console.log('Before hook running.');
                callback();
            });

        });

    });

};

module.exports = hooks;