/**
 * Authentication Service
 *
 * @type {{logout: Function, getToken: Function, loggedIn: Function, onChange: Function}}
 */
var Auth = {
    login: function (email, pass, callback) {
        callback = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (callback) {
                callback(true);
            }
            this.onChange(true);
            return;
        }
        var self = this;
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

    logout: function (callback) {
        delete localStorage.token;
        if (callback) {
            callback();
        }
        this.onChange(false);
    },

    getToken: function () {
        return localStorage.token;
    },

    loggedIn: function () {
        return !!localStorage.token;
    },

    onChange: function () {}
};

/* Fake request */
function pretendRequest (email, pass, callback) {
    setTimeout(function () {
        if (email === 'i.atroshkin@itransition.com' && pass === 'password') {
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