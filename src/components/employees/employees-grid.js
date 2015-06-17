var React = require('react');
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin');

var Filters = require('./filters');
var MarkedRow = require('./marked-row');

var EmployeesGrid = React.createClass({
    mixins: [AuthenticationMixin],
    getInitialState: function () {
        return EmployeesStore.getEmployeesState();
    },
    componentWillMount: function () {
        AppActions.loadEmployees();
        //AppActions.loadMarkers();
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
                var rowProps = {
                    projectsLength: employee.projects.length,
                    projectIndex: index,
                    employeeName: employee.name,
                    project: project
                };
                rows.push(<MarkedRow data={rowProps} key={'' + employee.id + project.id}/>);
            });
        });
        return (
            <div>
                <h1>Employees Grid</h1>
                <Filters />
                <div className="row">
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
            </div>
        )
    }
});

module.exports = EmployeesGrid;

