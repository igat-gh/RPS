/**
 * AuthStore stores the state of the user authentication.
 * For more info about Stores visit https://facebook.github.io/flux/docs/overview.html#stores
 * @module app/stores/app-auth-store
 */

var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


/**
 *
 * @type {string}
 * @desc This is my string, it's great.
 */
var CHANGE_EVENT = 'change';

/**
 *
 * @type {{authToken: null|string, loggedIn: boolean}}
 * @private
 */
var _authData = {
    authToken: null,
    loggedIn: false
};

/**
 *
 * @param {object} data Data from 'actions'
 */
function loadAuthData (data) {
    _authData.authToken = data.token;
    _authData.loggedIn = data.loggedIn;
}

/**
 * @name AuthStore
 */
var AuthStore = assign({}, EventEmitter.prototype,
    {
        /**
         * @memberOf AuthStore
         */
        emitChange: function () {
            this.emit(CHANGE_EVENT);
        },
        /**
         * @memberOf AuthStore
         * @param {function} callback
         */
        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback);
        },
        /**
         * @memberOf app/stores/app-auth-store
         * @param {function} callback
         */
        removeChangeListener: function (callback) {
            this.removeListener(CHANGE_EVENT, callback);
        },
        /**
         * @memberOf app/stores/app-auth-store
         */
        getState: function () {
            return _authData;
        },
        /**
         * @memberOf app/stores/app-auth-store
         */
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

