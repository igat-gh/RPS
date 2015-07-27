var React = require('react');
var Link = require('react-router').Link;
/**
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