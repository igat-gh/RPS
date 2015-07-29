var Settings = require('../../settings');
var Q = require('q');

var TOKEN_STORAGE_KEY = 'token';

function generateToken() {
    return Math.random().toString(36).substring(7);
}

function setToken() {
    var token = generateToken();
    this.browser.setLocalStorageKey(TOKEN_STORAGE_KEY, token);
}

function getToken() {
    return this.browser.getLocalStorageKey(TOKEN_STORAGE_KEY);
}

function* loginAsync() {
    yield this.browser.get(Settings.baseUrl);
    var token = yield getToken.call(this);

    if (!token) {
        yield setToken.call(this);
    }

    yield this.browser.get(Settings.baseUrl);
}

function loginSync() {
    return Q.async(() => loginAsync.call(this))();
}

exports.login = loginSync;