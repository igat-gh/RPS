var React = require('react');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');

var ProjectsView = React.createClass({
    mixins: [AuthenticationMixin],
    render: function () {
        return (
            <div>
                <h1>ProjectsView Component</h1>
            </div>
        )
    }
});

module.exports = ProjectsView;

