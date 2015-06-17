var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var EmployeeService = require('../services/employee');
var MarkersService = require('../services/markers');

var AppActions = {
    loadEmployees: function () {
        EmployeeService.fetch().then(function (employees) {
            var payload = {
                actionType: AppConstants.RECEIVE_EMPLOYEES,
                data: {
                    employees: employees
                }
            };
            AppDispatcher.handleViewAction(payload)
        });

    },
    loadMarkers: function () {
        MarkersService.fetch().then(function (markers) {
            MarkersService.setMarkers(markers);
        })
    }
};

module.exports = AppActions;