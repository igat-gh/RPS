var React = require('react');
var Link = require('react-router').Link;

var Menu = React.createClass({
    propTypes: {
        loggedIn: React.PropTypes.bool.isRequired
    },
    render: function () {
        return (
            <ul className="nav navbar-nav">
                { this.props.loggedIn ? <li><Link to="workload">Workload</Link></li> : ''}
            </ul>
        );
    }
});

module.exports = Menu;