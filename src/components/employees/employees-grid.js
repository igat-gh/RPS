var React = require('react');
var moment = require('moment');
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin');

var EmployeesGrid = React.createClass({
    mixins: [AuthenticationMixin],
    getInitialState: function () {
        return EmployeesStore.getEmployeesState();
    },
    componentWillMount: function () {
        AppActions.loadEmployees();
    },
    componentDidMount: function () {
        EmployeesStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        EmployeesStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState(EmployeesStore.getEmployeesState());
    },
    render: function () {
        var rows = [];
        this.state.employees.forEach(function (employee) {
            employee.projects.forEach(function (project, index) {
                var toBeOrNotToBe = index ? null : <td rowSpan={employee.projects.length}>{employee.name}</td>;
                rows.push(
                    <tr key={Math.random().toString(36).substring(7)}>
                        {toBeOrNotToBe}
                        <td>{project.title}</td>
                        <td>{moment(project.date_start).format('MMMM Do YYYY')}</td>
                        <td>{moment(project.date_end).format('MMMM Do YYYY')}</td>
                    </tr>
                );
            });
        });
        return (
            <div>
                <h1>Employees Grid</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employees</th>
                            <th>Projects</th>
                            <th>Start</th>
                            <th>End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = EmployeesGrid;

