var Promise = require('es6-promise').Promise;
var request = require('superagent');


/**
 * Wrapper for calling a API
 * @class
 * @type {object}
 */
var Api = {
    /**
     * Api method for calling async requests at the url
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