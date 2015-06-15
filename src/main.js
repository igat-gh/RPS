var React = require('react');
var Router = require('react-router');

var appRoutes = require('./routes');

Router.run(appRoutes, function (Handler) {
    React.render(<Handler/>, document.body);
});