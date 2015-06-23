var React = require('react');
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var FiltersConstants = require('../../constants/filters-constants');
var Moment = require('moment');

var Filters = React.createClass({
    handleClick: function (event) {
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
        console.log('filters');
        return (
            <p onClick={this.handleClick} className="row">
                Filters: &nbsp;
                <button data-filter-type={FiltersConstants.TYPE_ALL} className="btn btn-default" type="button">All</button>
                <button data-filter-type={FiltersConstants.TYPE_PROJECT} data-filter-option={1} className="btn btn-default" type="button">Selfeducation</button>
                <button data-filter-type={FiltersConstants.TYPE_PROJECT} data-filter-option={2} className="btn btn-default" type="button">Absence</button>
                <button data-filter-type={FiltersConstants.TYPE_TIME} data-filter-option={Moment.duration(1, 'weeks')} className="btn btn-default" type="button">1 week</button>
                <button data-filter-type={FiltersConstants.TYPE_TIME} data-filter-option={Moment.duration(2, 'weeks')} className="btn btn-default" type="button">2 week</button>
                <button data-filter-type={FiltersConstants.TYPE_TIME} data-filter-option={Moment.duration(1, 'month')} className="btn btn-default" type="button">1 month</button>
            </p>
        )
    }
});

module.exports = Filters;