var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var AuthStore = require('../../stores/app-auth-store');
var AuthAction = require('../../actions/app-auth-actions');

var Template = require('./app-template');
var Header = require('../header/header');

var APP = React.createClass({
    getInitialState: function () {
        return AuthStore.getState();
    },
    componentWillMount: function () {
        AuthStore.addChangeListener(this.setStateOnAuth);
        //AuthAction.login();
    },
    setStateOnAuth: function () {
        this.setState(AuthStore.getState());
    },
    render: function () {
        return (
            <Template>
                <Header loggedIn={this.state.loggedIn}/>
                <div className="container">
                    <RouteHandler/>
                </div>
            </Template>
        )
    }
});

exports.APP = APP;