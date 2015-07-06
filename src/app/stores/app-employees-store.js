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
 * @type {{type: null|string, value: null|string}}
 * @private
 */
var _currentFilter = {
    type: null,
    value: null
};

/**
 * Filter not ended projects for each employee
 * @param employeesList Array
 */
function loadEmployees(employeesList) {
    employeesList.map(function (employee) {
        employee.projects = employee.projects.filter(function (project) {
            if (!project.date_end) {
                return true;
            }
            return project.date_end > Moment();
        });
    });
    _employees = employeesList;
}

/**
 *
 * @param type String
 * @param value String
 */
function setFilter(type, value) {
    _currentFilter.type = type;
    _currentFilter.value = value;
}

/**
 *
 * @param type String
 * @param value String
 */
function filterEmployees(type, value) {
    switch (type) {
        case FiltersConstants.TYPE_PROJECT:
            _filteredEmployees = _employees.filter(function (employee) {
                return employee.projects.find(function (project) {
                    return project.id === +value;
                });
            });
            break;
        case FiltersConstants.TYPE_TIME:
            _filteredEmployees = _employees.filter(function (employee) {
                return employee.projects.some(function (project) {
                    var diff, duration;
                    if (!project.date_end) {
                        return false;
                    }
                    diff = Moment.duration(project.date_end - Moment());
                    duration = Moment.duration(value);
                    return diff <= duration;
                });
            });
            break;
        default :
            _currentFilter.type = null;
            _currentFilter.value = null;
            _filteredEmployees = [];
    }

    return _currentFilter.type ? _filteredEmployees : _employees;
}

/**
 * EmployeesStore stores the state of the workload.
 * For more info about Stores visit https://facebook.github.io/flux/docs/overview.html#stores
 */
var EmployeesStore = assign({}, EventEmitter.prototype,
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
        getEmployeesState: function () {
            var state = filterEmployees(_currentFilter.type, _currentFilter.value);
            return {employees: state};
        },
        dispatchToken: AppDispatcher.register(function (payload) {
            var action = payload.action;
            switch (action.actionType) {
                case AppConstants.RECEIVE_EMPLOYEES:
                    loadEmployees(action.data.employees);
                    break;
                case AppConstants.SET_FILTER:
                    setFilter(action.data.type, action.data.value);
                    break;
                default :
                    return true;
            }
            EmployeesStore.emitChange();
            return true;
        })
    }
);

module.exports = EmployeesStore;