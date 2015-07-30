var React = require('react');
var Router = require('react-router');

/** Init application routes */
var appRoutes = require('./routes');
var AuthAction = require('./actions/auth-actions');

/** Keep logged in */
AuthAction.login();

/** Run application */
Router.run(appRoutes, function (Handler) {
    React.render(<Handler/>, document.body);
});