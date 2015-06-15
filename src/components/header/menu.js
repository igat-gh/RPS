var React = require('react');
var Link = require('react-router').Link;

var Menu =  React.createClass({
    componentWillReceiveProps: function(nextProps) {
        this.props.loggedIn = nextProps.loggedIn;
    },
    render: function () {
        return (
            <ul className="nav navbar-nav">
                { this.props.loggedIn ? <li><Link to="projects">Projects</Link></li> : ''}
            </ul>
        )
    }
});

module.exports = Menu;