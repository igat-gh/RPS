var Login = require('../components/auth/app-login');
var AuthStore = require('../stores/app-auth-store');

var AuthenticationMixin = {
    statics: {
        willTransitionTo: function (transition) {
            if (!AuthStore.getState().loggedIn) {
                Login.attemptedTransition = transition;
                transition.redirect('/login');
            }
        }
    }
};


module.exports = AuthenticationMixin;