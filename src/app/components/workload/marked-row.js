var React = require('react');
var Moment = require('moment');
var Settings = require('../../settings');
var ProjectConstants = require('../../constants/project-constants');

require('moment-duration-format');
/**
 * @class
 * @type {*|Function}
 */
var MarkedRow = React.createClass({
    /**
     * @memberOf MarkedRow
     * @param {object} nextProps
     */
    componentWillReceiveProps: function (nextProps) {
        this.props.data = nextProps.data;
    },
    /**
     * @memberOf MarkedRow
     * @return {XML}
     */
    render: function () {
        var data = this.props.data;
        var project = data.projects[data.projectIndex];
        var toBeOrNotToBe = data.projectIndex > 0 ? null : <td rowSpan={data.projects.length}>{data.employeeName}</td>;
        var className = getMarker();
        function getTitle() {
            return project.title;
        }
        function getDateStart() {
            return Moment(project.date_start).format(Settings.date.format);
        }
        function getDateEnd() {
            var dateEnd;
            if (!project.date_end) {
                return Settings.date.undefined;
            }
            dateEnd = Moment(project.date_end).format(Settings.date.format);
            return dateEnd;
        }
        function getTimeLeft() {
            var timeLeft;
            if (!project.date_end) {
                return Settings.duration.undefined;
            }
            timeLeft = Moment.duration(project.date_end - Moment()).format(Settings.duration.format);
            return timeLeft;
        }
        function workloadHasExpired() {
            var timeLeft = Moment.duration(project.date_end - Moment());
            var durationToInform = Moment.duration(Settings.daysToWorkloadExpires, 'days');
            return timeLeft > 0 && timeLeft <= durationToInform;
        }
        function getMarker() {
            var marker;
            switch (project.type) {
                case ProjectConstants.TYPE_SELFEDUCATION:
                    marker = Settings.marker.classNames.selfEducation;
                    break;
                case ProjectConstants.TYPE_ABSENCE:
                    marker = Settings.marker.classNames.absence;
                    break;
                case ProjectConstants.TYPE_TEST_PERIOD:
                    marker = Settings.marker.classNames.testPeriod;
                    break;
                default:
                    marker = Settings.marker.classNames.project;
            }
            return marker;
        }

        return (
            <tr>
                {toBeOrNotToBe}
                <td className={className}>{getTitle()}</td>
                <td className={className}>{getDateStart()}</td>
                <td className={className}>{getDateEnd()}</td>
                <td className={className}>
                    {workloadHasExpired() &&
                    <span title="Expired less than a week"
                          className="glyphicon glyphicon-time"></span> } {getTimeLeft()}
                </td>
            </tr>
        );
    }
});

module.exports = MarkedRow;

