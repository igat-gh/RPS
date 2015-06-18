var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var FiltersConstants = require('../constants/filters-constants');
var EventEmitter = require('events').EventEmitter;
var Moment = require('moment');
var assign = require('object-assign');
require('array.prototype.find');

/**
 *
 * @type {string}
 */
var CHANGE_EVENT = 'change';

/**
 *
 * @type {Array} List of employees
 * @private
 */
var _employees = [];

/**
 *
 * @type {Array} List of filtered employees
 * @private
 */
var _filteredEmployees = [];

/**
 *
 * @type {undefined|string} Current filter
 * @private
 */
var _currentFilter = undefined;

/**
 *
 * @param employeesList Array
 */
function loadEmployees(employeesList) {
    _employees = employeesList;
}

/**
 *
 * @param type String
 * @param option String
 */
function filterEmployees(type, option) {
    switch (type) {
        case FiltersConstants.TYPE_PROJECT:
            _currentFilter = FiltersConstants.TYPE_PROJECT;
            _filteredEmployees = _employees.filter(function (employee) {
                return employee.projects.find(function (project) {
                    return project.id === +option;
                });
            });
            break;
        case FiltersConstants.TYPE_TIME:
            _currentFilter = FiltersConstants.TYPE_TIME;
            _filteredEmployees = _employees.filter(function (employee) {
                return employee.projects.some(function (project) {
                    var diff, duration;
                    if (!project.date_end) {
                        return false;
                    }
                    diff = Moment.duration(project.date_end - Moment());
                    duration = Moment.duration(+option);
                    return diff <= duration;
                });
            });
            break;
        case FiltersConstants.TYPE_RESET:
        default :
            _currentFilter = undefined;
            _filteredEmployees = [];
    }
}

/**
 * EmployeesStore stores the state of the employees.
 * For more info about Stores visit https://facebook.github.io/flux/docs/overview.html#stores
 */
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
            var state = {employees: _employees};
            if (_currentFilter) {
                state = {employees: _filteredEmployees};
            }
            return state;
        },
        dispatchToken: AppDispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.actionType) {
                case AppConstants.RECEIVE_EMPLOYEES:
                    loadEmployees(action.data.employees);
                    break;
                case AppConstants.FILTER_EMPLOYEES:
                    filterEmployees(action.data.type, action.data.option);
                    break;
                default : return true;
            }
            EmployeesStore.emitChange();
            return true;
        })
    }
);

module.exports = EmployeesStore;