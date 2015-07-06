var React = require('react');
var Moment = require('moment');
var Settings = require('../../settings');
var ProjectConstants = require('../../constants/project-constants');

require('moment-duration-format');

var MarkedRow = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.props.data = nextProps.data;
    },
    render: function () {
        var data = this.props.data;
        var toBeOrNotToBe = data.projectIndex > 0 ? null : <td rowSpan={data.projectsLength}>{data.employeeName}</td>;
        var className = this.getMarker();
        function getTitle() {
            return data.project.title;
        }
        function getDateStart() {
            return Moment(data.project.date_start).format(Settings.date.format);
        }
        function getDateEnd() {
            var dateEnd;
            if (!data.project.date_end) {
                return Settings.date.undefined;
            }
            dateEnd = Moment(data.project.date_end).format(Settings.date.format);
            return dateEnd;
        }
        function getTimeLeft() {
            var timeLeft;
            if (!data.project.date_end) {
                return Settings.duration.undefined;
            }
            timeLeft = Moment.duration(data.project.date_end - Moment()).format(Settings.duration.format);
            return timeLeft;
        }
        return (
            <tr>
                {toBeOrNotToBe}
                <td className={className}>{getTitle()}</td>
                <td className={className}>{getDateStart()}</td>
                <td className={className}>{getDateEnd()}</td>
                <td className={className}>{getTimeLeft()}</td>
            </tr>
        );
    },
    getMarker: function () {
        var project = this.props.data.project, marker;
        switch (project.type) {
            case ProjectConstants.TYPE_SELFEDUCATION:
                marker = Settings.marker.color.danger;
                break;
            case ProjectConstants.TYPE_ABSENCE:
                marker = Settings.marker.color.warning;
                break;
            case ProjectConstants.TYPE_TEST_PERIOD:
                marker = Settings.marker.color.info;
                break;
            default:
                marker = Settings.marker.color.default;
        }
        return marker;
    }
});

module.exports = MarkedRow;

