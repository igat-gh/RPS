var React = require('react');
var AuthStore = require('../../stores/app-auth-store');
var AuthAction = require('../../actions/auth-actions');
/**
 * @class
 * @type {*|Function}
 */
var Logout = React.createClass({
    /*
     statics: {
     willTransitionTo: function (transition) {
     if (AuthStore.getState().loggedIn) {
     Logout.attemptedTransition = transition;
     transition.redirect('/');
     }
     }
     },
     */
    /**
     * @memberOf Logout
     */
    componentWillMount: function () {
        AuthAction.logout();
    },
    /**
     * @memberOf Logout
     * @return {XML}
     */
    render: function () {
        return <p>You are logged out now!</p>;
    }
});


module.exports = Logout;