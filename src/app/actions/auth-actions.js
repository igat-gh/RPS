var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var Auth = require('../services/auth');


/**
 * Authentication action creator.
 * @see More info about Actions and Action Creators visit {@link https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#actions-and-action-creators}
 * @class
 */
var AuthActions = {
    /**
     * Logs in user with specified email and password combination
     * @param {string} email User email address
     * @param {string} pass User password
     */
    login: function (email, pass) {
        Auth.login(email, pass, function () {
            var payload = {
                actionType: AppConstants.AUTH_LOG_IN,
                data: {
                    token: Auth.getToken(),
                    loggedIn: Auth.loggedIn()
                }
            };
            AppDispatcher.handleViewAction(payload);
        });
    },

    /**
     * Log out
     * @function
     */
    logout: function () {
        Auth.logout(function () {
            var payload = {
                actionType: AppConstants.AUTH_LOG_OUT,
                data: {
                    token: Auth.getToken(),
                    loggedIn: Auth.loggedIn()
                }
            };
            AppDispatcher.handleViewAction(payload);
        });
    }
};

module.exports = AuthActions;