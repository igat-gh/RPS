var AuthStore = require('../stores/app-auth-store');
var Login = require('../components/auth/login');

/**
 * AuthenticationMixin.
 * Use for auth protected components.
 * @class
 * @type {{statics: {willTransitionTo: Function}}}
 */
var AuthenticationMixin = {
    /**
     * @type {object}
     */
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