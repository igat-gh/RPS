var React = require('react');
var Settings = require('../../settings');

var Markers = React.createClass({
    render: function () {
        return (
            <ul className="markers-list">
                <li><span className={'box ' + Settings.marker.color.info}></span> Test Period</li>
                <li><span className={'box ' + Settings.marker.color.warning}></span> Absence</li>
                <li><span className={'box ' + Settings.marker.color.danger}></span> Selfeducation</li>
            </ul>
        );
    }
});

module.exports = Markers;