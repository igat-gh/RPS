var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

APP = require('./components/app/app').APP;

var Login = require('./components/auth/app-login');
var Logout = require('./components/auth/app-logout');
var Projects = require('./components/projects/projects-view');

var routes = (
    <Route name="app" path="/" handler={APP}>
        <Route name="login" handler={Login} />
        <Route name="logout" handler={Logout} />
        <Route name="projects" handler={Projects} />
    </Route>
);

module.exports = routes;