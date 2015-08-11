/**
 * Authentication Service
 * @class
 * @type {{logout: Function, getToken: Function, loggedIn: Function, onChange: Function}}
 */
var Auth = {
    /**
     * Authentication function. It takes username, password and callback to log in.
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
         * Call fake request. If authentication is successful, write a token in the local storage
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
     * Logs user out function. Deletes token from the local storage, if has a callback, call it.
     * @memberOf Auth
     * @param {function} callback Callback function
     */
    logout: function (callback) {
        delete localStorage.token;
        if (callback) {
            callback();
        }
        this.onChange(false);
    },
    /**
     * Returns token value.
     * @memberOf Auth
     * @return {*|string|context.token|Function|string}
     */
    getToken: function () {
        return localStorage.token;
    },
    /**
     * Does a token in the local storage?
     * @memberOf Auth
     * @return {boolean}
     */
    loggedIn: function () {
        return !!localStorage.token;
    },

    onChange: function () {}
};

/**
 * Fake request.
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