var React = require('react');
var Moment = require('moment');
var Settings = require('../../settings');
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
        /* TODO: Delegate this hardcoded functionality. Think about how to store markers in db (or maybe config) and how to present them in json structure */
        var project = this.props.data.project;
        var timeLeft = Moment.duration(project.date_end - Moment());
        var durationToInform = Moment.duration(7, 'days');

        if (timeLeft > 0 && timeLeft <= durationToInform) {
            return Settings.marker.color.warning;
        }

        if (1 === project.id) {
            return Settings.marker.color.danger;
        }

        return Settings.marker.color.default;
    }
});

module.exports = MarkedRow;

