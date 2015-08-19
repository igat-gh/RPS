var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var EmployeeService = require('../services/employee');

/**
 * Application action creator.
 * @see More info about Actions and Action Creators visit {@link https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#actions-and-action-creators}
 * @class
 */
var AppActions = {

    /**
     * Load employees and add this data in action
     * @return {object} Promise
     */
    loadEmployees: function () {
        EmployeeService.fetch().then(function (employees) {
            var payload = {
                actionType: AppConstants.RECEIVE_EMPLOYEES,
                data: {
                    employees: employees
                }
            };
            AppDispatcher.handleViewAction(payload);
        });
    },

    /**
     * Sets filtering parameters to employees
     * @param {string} type Type project or time
     * @param {string} value Value of filter
     */
    setEmployeeFilter: function (type, value) {
        var payload = {
            actionType: AppConstants.SET_FILTER,
            data: {
                type: type,
                value: value
            }
        };
        AppDispatcher.handleViewAction(payload);
    }
};

module.exports = AppActions;