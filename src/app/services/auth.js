/**
 * Authentication Service
 * @class Auth
 * @type {{logout: Function, getToken: Function, loggedIn: Function, onChange: Function}}
 */
var Auth = {



    /**
     * @param email
     * @param pass
     * @param callback
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
         * @memberOf Auth
         * @type {Auth}
         */
        var self = this;

        /**
         * @function
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
     *
     * @param callback
     */
    logout: function (callback) {
        delete localStorage.token;
        if (callback) {
            callback();
        }
        this.onChange(false);
    },
    /**
     *
     * @return {*|string|context.token|Function|string}
     */
    getToken: function () {
        return localStorage.token;
    },
    /**
     *
     * @return {boolean}
     */
    loggedIn: function () {
        return !!localStorage.token;
    },

    onChange: function () {}
};

/**
 * Fake request
 * @param email
 * @param pass
 * @param callback
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