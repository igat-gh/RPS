var Login = require('../components/auth/login');
var AuthStore = require('../stores/app-auth-store');

var AuthenticationMixin = {
    statics: {
        willTransitionTo: function (transition) {
            console.log('willTransitionTo, state:', AuthStore.getState());
            if (!AuthStore.getState().loggedIn) {
                Login.attemptedTransition = transition;
                transition.redirect('/login');
            }
        }
    }
};


module.exports = AuthenticationMixin;