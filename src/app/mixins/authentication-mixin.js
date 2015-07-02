var Login = require('../components/auth/login');
var AuthStore = require('../stores/app-auth-store');

/**
 * AuthenticationMixin.
 * Use for auth protected components.
 *
 * @type {{statics: {willTransitionTo: Function}}}
 */
var AuthenticationMixin = {
    statics: {
        willTransitionTo: function (transition, params) {
            if (!AuthStore.getState().loggedIn) {
                Login.attemptedTransition = transition;
                transition.redirect('/login');
            }
        }
    }
};

module.exports = AuthenticationMixin;