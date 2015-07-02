var React = require('react');
var Link = require('react-router').Link;
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var FiltersConstants = require('../../constants/filters-constants');
var Moment = require('moment');

var Filters = React.createClass({
    handleClick: function (event) {
        console.log(event);
        event.stopPropagation();
        var element = event.target, filterType, filterOption;
        filterType = element.dataset.filterType;
        if (!filterType) {
            return;
        }
        filterOption = element.dataset.filterOption;
        AppActions.filterEmployees(filterType, filterOption);
    },
    render: function () {
        /* jshint ignore:start */
        return (
            <p className="btn-group center-block">
                <Link to={`/workload`} className="btn btn-default">All</Link>
                <Link to={`/workload/filter/${FiltersConstants.TYPE_PROJECT}/1`} className="btn btn-default">
                    Selfeducation
                </Link>
                <Link to={`/workload/filter/${FiltersConstants.TYPE_PROJECT}/2`} className="btn btn-default">
                    Absence
                </Link>
                <Link to={`/workload/filter/${FiltersConstants.TYPE_TIME}/${Moment.duration(1, 'weeks')}`}
                      className="btn btn-default">1 week
                </Link>
                <Link to={`/workload/filter/${FiltersConstants.TYPE_TIME}/${Moment.duration(2, 'weeks')}`}
                      className="btn btn-default">2 week
                </Link>
                <Link to={`/workload/filter/${FiltersConstants.TYPE_TIME}/${Moment.duration(1, 'month')}`}
                      className="btn btn-default">1 month
                </Link>
            </p>
        );
        /* jshint ignore:end */
    }
});

module.exports = Filters;