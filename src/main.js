var React = require('react');
var Router = require('react-router');
var AuthAction = require('./actions/app-auth-actions');

var appRoutes = require('./routes');

AuthAction.login();

Router.run(appRoutes, function (Handler) {
    React.render(<Handler/>, document.body);
});