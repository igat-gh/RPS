var React = require('react');
var Router = require('react-router');
var AuthStore = require('../../stores/app-auth-store');
var AuthAction = require('../../actions/auth-actions');

var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },
    statics: {
        attemptedTransition: null
    },
    getInitialState: function () {
        return {loginError: false};
    },
    componentDidMount: function () {
        AuthStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AuthStore.removeChangeListener(this._onChange);
    },
    componentDidUpdate: function () {
        if (Login.attemptedTransition) {
            var transition = Login.attemptedTransition;
            transition.retry();
        } else {
            this.context.router.replaceWith('/workload');
        }
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var email = this.refs.email.getDOMNode().value;
        var pass = this.refs.pass.getDOMNode().value;
        AuthAction.login(email, pass);
    },
    _onChange: function () {
        var loginError = !AuthStore.getState().loggedIn;
        this.setState({loginError: loginError});
    },
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
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
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