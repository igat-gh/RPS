var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var AuthStore = require('../../stores/app-auth-store');
var AuthAction = require('../../actions/auth-actions');

var Template = require('./app-template');
var Header = require('../header/header');
/**
 * @namespace
 * @type {*|Function}
 */
var APP = React.createClass({
    /**
     * @memberOf APP
     * @return {*}
     */
    getInitialState: function () {
        return AuthStore.getState();
    },
    /**
     * @memberOf APP
     */
    componentWillMount: function () {
        AuthStore.addChangeListener(this.setStateOnAuth);
    },
    /**
     * @memberOf APP
     */
    setStateOnAuth: function () {
        this.setState(AuthStore.getState());
    },
    /**
     * @memberOf APP
     * @return {XML}
     */
    render: function () {
        return (
            <Template>
                <Header loggedIn={this.state.loggedIn}/>

                <div className="container">
                    <RouteHandler/>
                </div>
            </Template>
        );
    }
});

exports.APP = APP;