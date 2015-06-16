var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

APP = require('./components/app/app').APP;

var Home = require('./components/home/home');
var Login = require('./components/auth/login');
var Logout = require('./components/auth/logout');
var EmployeesGrid = require('./components/employees/employees-grid');

var routes = (
    <Route name="app" path="/" handler={APP}>
        <DefaultRoute handler={Home}/>
        <Route name="login" handler={Login} />
        <Route name="logout" handler={Logout} />
        <Route name="employees-grid" handler={EmployeesGrid} />
    </Route>
);

module.exports = routes;