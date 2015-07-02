var React = require('react');
var AppActions = require('../../actions/app-actions');
var EmployeesStore = require('../../stores/app-employees-store');
var AuthStore = require('../../stores/app-auth-store');
//var AuthenticationMixin = require('../../mixins/authentication-mixin');

var Filters = require('./filters');
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
            console.log('transition');
            console.log(params);
            AppActions.filterEmployees(params.type, params.option);
        }
    },
    getInitialState: function () {
        console.log('initital state');
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
                <div className="row">
                    <div className="col-md-4">
                        <h1 className="">Workload</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Filters />
                    </div>
                </div>
                <div className="row">
                    <table className="table">
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
                </div>
            </div>
        );
    }
});

module.exports = EmployeesGrid;

