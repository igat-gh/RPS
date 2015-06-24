var React = require('react');
var Router = require('react-router');
var AuthAction = require('./actions/auth-actions');

/* Init application routes */
var appRoutes = require('./routes');

/* Keep logged in */
AuthAction.login();

/* Run application */
Router.run(appRoutes, function (Handler) {
    React.render(<Handler/>, document.body);
});