var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _employees = [];

function loadEmployees(data) {
    _employees = data.employees;
}

var EmployeesStore = assign({}, EventEmitter.prototype,
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
        getEmployeesState: function () {
            return {employees: _employees};
        },
        dispatcherIndex: AppDispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.actionType) {
                case AppConstants.RECEIVE_EMPLOYEES:
                    loadEmployees(action.data);
                    break;
                default : return true;
            }
            EmployeesStore.emitChange();
            return true;
        })
    }
);

module.exports = EmployeesStore;