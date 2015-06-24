var React = require('react');

var Home = React.createClass({
    render: function () {
        var h1Style = {
            textAlign: 'center'
        };
        return (
            <div className="jumbotron">
                <h1 style={h1Style}>Resource Planning System</h1>
            </div>
        );
    }
});

module.exports = Home;