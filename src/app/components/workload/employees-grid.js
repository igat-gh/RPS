var React = require('react');
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var AuthStore = require('../../stores/app-auth-store');
var Loader = require('react-loader');
var Settings = require('../../settings');
var Filters = require('./filters');
var Markers = require('./markers');
var MarkedRow = require('./marked-row');
var Login = require('../auth/login');

var EmployeesGrid = React.createClass({
    statics: {
        willTransitionTo: function (transition, params) {
            if (!AuthStore.getState().loggedIn) {
                Login.attemptedTransition = transition;
                transition.redirect('/login');
                return;
            }
            AppActions.setEmployeeFilter(params.type, params.value);
        }
    },
    getInitialState: function () {
        return {
            loaded: false,
            employees: EmployeesStore.getEmployees()
        };
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
        this.setState({
            loaded: true,
            employees: EmployeesStore.getEmployees()
        });
    },
    render: function () {
        var rows = [];
        this.state.employees.forEach(function (employee) {
            employee.projects.forEach(function (project, index) {
                var rowProps = {
                    projectIndex: index,
                    employeeName: employee.name,
                    projects: employee.projects
                };
                rows.push(<MarkedRow data={rowProps} key={'' + employee.id + project.id}/>);
            });
        });
        return (
            <div id="workload">
                <div className="row">
                    <div className="col-md-4">
                        <h1 className="">Workload</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Filters />
                    </div>
                    <div className="col-md-6">
                        <Markers />
                    </div>
                </div>
                <div className="row">
                    <Loader loaded={this.state.loaded}>
                        <table className="table workload-grid">
                            <thead>
                            <tr>
                                <th>Employees</th>
                                <th>Projects</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Time Left</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </Loader>
                </div>
            </div>
        );
    }
});

module.exports = EmployeesGrid;

