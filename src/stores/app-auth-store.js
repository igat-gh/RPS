var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var React = require('react/addons');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _authData = {
    authToken: null,
    loggedIn: false
};

function loadAuthData(data) {
    _authData.auth_token = data.token;
    _authData.loggedIn = data.loggedIn;
}

var AuthStore = assign({}, EventEmitter.prototype,
    {
        emitChange: function () {
            this.emit(CHANGE_EVENT);
        },
        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback)
        },
        removeChangeListener: function (callback) {
            this.removeListener(CHANGE_EVENT, callback)
        },
        getState: function () {
            return _authData;
        },
        dispatcherIndex: AppDispatcher.register(function (payload) {
            var action = payload.action;
            console.log(payload);
            switch (action.actionType) {
                case AppConstants.AUTH_LOG_IN:
                case AppConstants.AUTH_LOG_OUT:
                    loadAuthData(action.data);
                    break;
                default : return true;
            }
            // ≈сли действие было выполнено, emit мен€ет событие (If action was acted upon, emit change event)
            AuthStore.emitChange();
            return true;
        })
    }
);

module.exports = AuthStore;

