var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var EmployeeService = require('../services/employee');
var MarkersService = require('../services/markers');

/**
 * Application action creator.
 * More info about Actions and Action Creators visit
 * https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#actions-and-action-creators
 * @type {{loadEmployees: Function, filterEmployees: Function}}
 */
var AppActions = {
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
    filterEmployees: function (type, option) {
        var payload = {
            actionType: AppConstants.SET_FILTER,
            data: {
                type: type,
                option: option
            }
        };
        AppDispatcher.handleViewAction(payload);
    }
};

module.exports = AppActions;