var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var EmployeeService = require('../services/employee');
var MarkersService = require('../services/markers');

/**
 * Application action creator.
 * @see More info about Actions and Action Creators visit {@link https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#actions-and-action-creators}
 * @class
 */
var AppActions = {

    /**
     * AppActions~loadEmployees
     * Requests list of children from the server by user id.
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
     * Sort table by filter
     * @param {string} type
     * @param {string} value
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