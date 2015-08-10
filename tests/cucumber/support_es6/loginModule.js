var Q = require('q');

var Settings = require('../../settings');

var TOKEN_STORAGE_KEY = 'token';

function generateToken() {
    return Math.random().toString(36).substring(7);
}

function setToken() {
    var token = generateToken();
    return this.browser.executeScript(`localStorage.setItem('${TOKEN_STORAGE_KEY}', '${token}');`);
}

function getToken() {
    return this.browser.executeScript(`return localStorage.getItem('${TOKEN_STORAGE_KEY}');`);
}

function* loginAsync() {
    this.browser.get(Settings.baseUrl);
    var token = yield getToken.call(this);

    if (!token) {
        setToken.call(this);
    }

    this.browser.get(Settings.baseUrl);
}

function loginSync() {
    return Q.async(() => loginAsync.call(this))();
}

exports.login = loginSync;