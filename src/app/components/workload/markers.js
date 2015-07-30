var React = require('react');
var Settings = require('../../settings');
/**
 * Description of the table's markers. Returns list with color squares and designation.
 * @class
 * @type {*|Function}
 */
var Markers = React.createClass({
    /**
     * @memberOf Markers
     * @return {XML}
     */
    render: function () {
        return (
            <ul className="markers-list">
                <li><span className={'box ' + Settings.marker.classNames.testPeriod}></span> Test Period</li>
                <li><span className={'box ' + Settings.marker.classNames.absence}></span> Absence</li>
                <li><span className={'box ' + Settings.marker.classNames.selfEducation}></span> Selfeducation</li>
            </ul>
        );
    }
});

module.exports = Markers;