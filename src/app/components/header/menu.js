var Link = require('react-router').Link;
var React = require('react');

/**
 * Navigation menu component. Shows main menu for authorized user, otherwise is empty.
 * @class
 * @type {*|Function}
 */
var Menu = React.createClass({
    propTypes: {
        loggedIn: React.PropTypes.bool.isRequired
    },
    /**
     * @memberOf Menu
     * @return {XML}
     */
    render: function () {
        return (
            <ul className="nav navbar-nav">
                { this.props.loggedIn ? <li><Link to="workload">Workload</Link></li> : ''}
            </ul>
        );
    }
});

module.exports = Menu;