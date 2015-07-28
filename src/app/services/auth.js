/**
 * Authentication Service
 * @class
 * @type {{logout: Function, getToken: Function, loggedIn: Function, onChange: Function}}
 */
var Auth = {
    /**
     * @param {string} email User email
     * @param {string} pass User password
     * @param {function} callback Will called after authorization
     * @memberOf Auth
     */
    login: function (email, pass, callback) {
        callback = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (callback) {
                callback(true);
            }
            this.onChange(true);
            return;
        }

        /**
         * Save context 'this'
         * @memberOf Auth
         * @type {Auth}
         */
        var self = this;

        /**
         * @memberOf Auth
         */
        pretendRequest(email, pass, function (res) {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (callback) {
                    callback(true);
                }
                self.onChange(true);
            } else {
                if (callback) {
                    callback(false);
                }
                self.onChange(false);
            }
        });
    },

    /**
     * @memberOf Auth
     * @param {function} callback
     */
    logout: function (callback) {
        delete localStorage.token;
        if (callback) {
            callback();
        }
        this.onChange(false);
    },
    /**
     * @memberOf Auth
     * @return {*|string|context.token|Function|string}
     */
    getToken: function () {
        return localStorage.token;
    },
    /**
     * Include auth status to Action
     * @memberOf Auth
     * @return {boolean}
     */
    loggedIn: function () {
        return !!localStorage.token;
    },

    onChange: function () {}
};

/**
 * Fake request
 * @param {string} email
 * @param {string} pass
 * @param {function} callback
 */
function pretendRequest (email, pass, callback) {
    setTimeout(function () {
        if (email === 'example@email.com' && pass === 'password') {
            callback({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            });
        } else {
            callback({authenticated: false});
        }
    }, 0);
}

module.exports = Auth;