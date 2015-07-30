var React = require('react');
/**
 * Home page. Default state of app with header "Resource Planning System"
 * @class
 * @type {*|Function}
 */
var Home = React.createClass({
    /**
     * @memberOf Home
     * @return {XML}
     */
    render: function () {
        return (
            <div className="jumbotron">
                <h1 className="text-center">Resource Planning System</h1>
            </div>
        );
    }
});

module.exports = Home;