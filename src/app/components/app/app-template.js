var React = require('react');
/**
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