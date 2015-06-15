var React = require('react');
var Link = require('react-router').Link;

var Menu = require('./menu');

var Header = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        this.props.loggedIn = nextProps.loggedIn;
    },
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
                                    {
                                        this.props.loggedIn
                                        ? (<Link to="logout">Log out</Link>)
                                        : (<Link to="login">Sign in</Link>)
                                    }
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