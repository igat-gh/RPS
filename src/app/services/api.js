var request = require('superagent');
var Promise = require('es6-promise').Promise;

/**
 * Wrapper for calling a API
 * @class
 * @type {object}
 */
var Api = {
    /**
     * @param {string} url Current URL
     * @return {object} Promise
     */
    get: function (url) {
        return new Promise(function (resolve, reject) {
            request
                .get(url)
                .end(function (res) {
                    if (404 === res.status) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    }
};

module.exports = Api;