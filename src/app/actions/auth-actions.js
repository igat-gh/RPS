var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var Auth = require('../services/auth');

/**
 * Authentication action creator.
 * More info about Actions and Action Creators visit
 * https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#actions-and-action-creators
 *  AuthActions
 * @class
 */
var AuthActions = {
    /**
     * @function
     * @param email
     * @param pass
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
/**
 * AuthActions module
 * @module AuthActions
 * @type {{login: Function, logout: Function}}
 */
module.exports = AuthActions;