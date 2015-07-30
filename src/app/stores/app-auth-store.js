var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

/**
 * AuthStore stores the state of the user authentication.
 * @see For more info about Stores visit {@link https://facebook.github.io/flux/docs/overview.html#stores}
 * @module AuthStore
 */

/**
 * @type {string}
 */
var CHANGE_EVENT = 'change';

/**
 * User's authorization state
 * @type {{authToken: null|string, loggedIn: boolean}}
 * @private
 */
var _authData = {
    authToken: null,
    loggedIn: false
};

/**
 * Set new values in _authData.
 * @param {object} data Data from 'actions'
 */
function loadAuthData (data) {
    _authData.authToken = data.token;
    _authData.loggedIn = data.loggedIn;
}
/**
 * AuthStore stores the state of the user authentication.
 */
var AuthStore = assign({}, EventEmitter.prototype,
    {
        emitChange: function () {
            this.emit(CHANGE_EVENT);
        },
        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback);
        },
        removeChangeListener: function (callback) {
            this.removeListener(CHANGE_EVENT, callback);
        },
        getState: function () {
            return _authData;
        },
        dispatchToken: AppDispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.actionType) {
            case AppConstants.AUTH_LOG_IN:
            case AppConstants.AUTH_LOG_OUT:
                loadAuthData(action.data);
                break;
            default :
                return true;
            }
            AuthStore.emitChange();
            return true;
        })
    }
);
module.exports = AuthStore;

