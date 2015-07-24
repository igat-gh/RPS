/**
 * @module
 * @type {object}
 */

/** Init application routes
 * @type {object}
 * */
var React = require('react');
var Router = require('react-router');
var AuthAction = require('./actions/auth-actions');


var appRoutes = require('./routes');

/**
 * Keep logged in
 * @function
 * @type {function}
 *  */
AuthAction.login();

/**
 * @function
 * Run application */
Router.run(appRoutes, function (Handler) {
    React.render(<Handler/>, document.body);
});