var React = require('react');
var Link = require('react-router').Link;
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var FiltersConstants = require('../../constants/filters-constants');
var Moment = require('moment');

var Filters = React.createClass({
    render: function () {
        return (
            <p className="btn-group center-block">
                <Link to="/workload" className="btn btn-default">All</Link>
                <Link to="workload-filter" params={{type: FiltersConstants.TYPE_PROJECT, option: 1}}
                      className="btn btn-default">
                    Selfeducation
                </Link>
                <Link to="workload-filter" params={{type: FiltersConstants.TYPE_PROJECT, option: 2}}
                      className="btn btn-default">
                    Absence
                </Link>
                <Link to="workload-filter"
                      params={{type: FiltersConstants.TYPE_TIME, option: Moment.duration(1, 'weeks')}}
                      className="btn btn-default">1 week
                </Link>
                <Link to="workload-filter"
                      params={{type: FiltersConstants.TYPE_TIME, option: Moment.duration(2, 'weeks')}}
                      className="btn btn-default">2 week
                </Link>
                <Link to="workload-filter"
                      params={{type: FiltersConstants.TYPE_TIME, option: Moment.duration(1, 'month')}}
                      className="btn btn-default">1 month
                </Link>
            </p>
        );
    }
});

module.exports = Filters;