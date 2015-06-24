var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var Auth = require('../services/auth');

/**
 * Authentication action creator.
 * More info about Actions and Action Creators visit
 * https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#actions-and-action-creators
 * @type {{login: Function, logout: Function}}
 */
var AuthActions = {
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