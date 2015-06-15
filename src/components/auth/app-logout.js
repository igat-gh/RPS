var React = require('react');
var AuthStore = require('../../stores/app-auth-store');
var AuthAction = require('../../actions/app-auth-action');

var Logout = React.createClass({
    //statics: {
    //    willTransitionTo: function (transition) {
    //        if (AuthStore.getState().loggedIn) {
    //            Logout.attemptedTransition = transition;
    //            transition.redirect('/');
    //        }
    //    }
    //},
    componentWillMount: function () {
        AuthAction.logout();
    },
    render: function () {
        return <p>You are now logged out.</p>;
    }
});


module.exports = Logout;