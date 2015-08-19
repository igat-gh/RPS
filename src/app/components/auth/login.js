var React = require('react');
var Router = require('react-router');

var AuthAction = require('../../actions/auth-actions');
var AuthStore = require('../../stores/app-auth-store');

/**
 * Login form component
 * @class
 * @type {*|Function}
 */
var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },
    statics: {
        attemptedTransition: null
    },
    /**
     * @memberOf Login
     * @return {{loginError: boolean}}
     */
    getInitialState: function () {
        return {loginError: false};
    },
    /**
     * @memberOf Login
     */
    componentDidMount: function () {
        AuthStore.addChangeListener(this._onChange);
    },
    /**
     * @memberOf Login
     */
    componentWillUnmount: function () {
        AuthStore.removeChangeListener(this._onChange);
    },
    /**
     * @memberOf Login
     */
    componentDidUpdate: function () {
        if (Login.attemptedTransition) {
            var transition = Login.attemptedTransition;
            transition.retry();
        } else {
            this.context.router.replaceWith('/workload');
        }
    },
    /**
     * @memberOf Login
     * @param {object} event Form object
     */
    handleSubmit: function (event) {
        event.preventDefault();
        var email = this.refs.email.getDOMNode().value;
        var pass = this.refs.pass.getDOMNode().value;
        AuthAction.login(email, pass);
    },
    /**
     * @memberOf Login
     * @private
     */
    _onChange: function () {
        var loginError = !AuthStore.getState().loggedIn;
        this.setState({loginError: loginError});
    },
    /**
     * @memberOf Login
     * @return {XML}
     */
    render: function () {
        var fieldGroupClassName = this.state.loginError ? 'form-group has-error' : 'form-group';
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Sign in</legend>
                            <div className={fieldGroupClassName}>
                                <label ref="email" placeholder="email" className="control-label"
                                       htmlFor="auth-email-input">Email</label>
                                <input type="text" ref="email" defaultValue="example@email.com"
                                       className="form-control" id="auth-email-input"/>
                            </div>
                            <div className={fieldGroupClassName}>
                                <label ref="pass" placeholder="password" className="control-label"
                                       htmlFor="auth-password-input">Password</label>
                                <input type="text" ref="pass" className="form-control" defaultValue="password"
                                       id="auth-password-input"/>
                            </div>
                            <div className="form-group">
                                <button id="btn-login" type="submit" className="btn btn-primary btn-block login-btn">Login</button>
                            </div>
                            {
                                this.state.loginError ?
                                (
                                    <div className="alert alert-danger">
                                        <strong>Bad login information!</strong>
                                    </div>
                                ) : ('')
                            }
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = Login;