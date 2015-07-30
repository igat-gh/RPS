var React = require('react');
/**
 * Outsides div wrapper for APP
 * @class
 * @type {*|Function}
 */
var Template = React.createClass({
    /**
     * @memberOf Template
     * @return {XML}
     */
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Template;