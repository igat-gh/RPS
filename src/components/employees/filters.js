var React = require('react');
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');

var Filters = React.createClass({
    render: function () {
        return (
            <div className="row">
                Filters: &nbsp;
                <button className="btn btn-default" type="button">All</button>
                <button className="btn btn-default" type="button">Self education</button>
                <button className="btn btn-default" type="button">Absence</button>
                <button className="btn btn-default" type="button">1 week</button>
                <button className="btn btn-default" type="button">2 week</button>
                <button className="btn btn-default" type="button">1 month</button>
            </div>
        )
    }
});

module.exports = Filters;