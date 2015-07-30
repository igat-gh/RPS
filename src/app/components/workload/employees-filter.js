var Link = require('react-router').Link;
var Moment = require('moment');
var React = require('react');

var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var FiltersConstants = require('../../constants/filters-constants');
var ProjectConstants = require('../../constants/project-constants');

/**
 * Employees data grid filters component.
 * @class
 * @type {*|Function}
 */
var EmployeesFilters = React.createClass({
    /**
     * @memberOf EmployeesFilters
     * @return {XML}
     */
    render: function () {
        return (
            <p className="btn-group center-block">
                <Link to="/workload" className="btn btn-default">All</Link>
                <Link to="workload-filter" params={{type: FiltersConstants.TYPE_PROJECT, value: ProjectConstants.TYPE_SELFEDUCATION}}
                      className="btn btn-default">
                    Selfeducation
                </Link>
                <Link to="workload-filter" params={{type: FiltersConstants.TYPE_PROJECT, value: ProjectConstants.TYPE_ABSENCE}}
                      className="btn btn-default">
                    Absence
                </Link>
                <Link to="workload-filter"
                      params={{type: FiltersConstants.TYPE_TIME, value: Moment.duration(1, 'weeks')}}
                      className="btn btn-default">1 week
                </Link>
                <Link to="workload-filter"
                      params={{type: FiltersConstants.TYPE_TIME, value: Moment.duration(2, 'weeks')}}
                      className="btn btn-default">2 week
                </Link>
                <Link to="workload-filter"
                      params={{type: FiltersConstants.TYPE_TIME, value: Moment.duration(1, 'month')}}
                      className="btn btn-default">1 month
                </Link>
            </p>
        );
    }
});

module.exports = EmployeesFilters;