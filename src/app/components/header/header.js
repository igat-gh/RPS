var Link = require('react-router').Link;
var React = require('react');

var Menu = require('./menu');

/**
 * Header component with top menu, login and logout links
 * @class
 * @type {*|Function}
 */
var Header = React.createClass({
    propTypes: {
        loggedIn: React.PropTypes.bool.isRequired
    },
    /**
     * @memberOf Header
     * @return {XML}
     */
    render: function () {
        return (
            <header>
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">RPS</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <Menu {...this.props} />
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    { this.props.loggedIn ? (<Link to="logout">Log out</Link>) :
                                      (<Link to="login">Sign in</Link>) }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
});

module.exports = Header;