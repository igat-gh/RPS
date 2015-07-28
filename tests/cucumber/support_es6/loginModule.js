'use strict';

require('babel/polyfill');
var Q = require('q');
var Settings = require('../../settings');

var loginModule = {

    login: function* (context) {
        yield context.browser.get(Settings.baseUrl);
        var token = yield context.browser.getLocalStorageKey('token');

        if (!token) {
            yield context.browser.setLocalStorageKey('token', Math.random().toString(36).substring(7));
        }

        yield context.browser.get(Settings.baseUrl);
    }

};

module.exports = loginModule;