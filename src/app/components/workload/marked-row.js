var React = require('react');
var Moment = require('moment');
var Settings = require('../../settings');

var MarkedRow = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.props.data = nextProps.data;
    },
    render: function () {
        var data = this.props.data;
        var toBeOrNotToBe = data.projectIndex > 0 ? null : <td rowSpan={data.projectsLength}>{data.employeeName}</td>;
        var className = this.getBgColor();
        return (
            <tr>
                {toBeOrNotToBe}
                <td className={className}>{data.project.title}</td>
                <td className={className}>{Moment(data.project.date_start).format(Settings.date.format)}</td>
                <td className={className}>{data.project.date_end ? Moment(data.project.date_end).format(Settings.date.format) :
                    Settings.date.notSet}</td>
            </tr>
        );
    },
    getBgColor: function () {
        /* TODO: Delegate this hardcoded functionality. Think about how to store markers in db and how to present them in json structure */
        var project = this.props.data.project,
            timeLeft = Moment.duration(project.date_end - Moment()),
            duration = Moment.duration(7, 'days');
        if (timeLeft > 0 && timeLeft <= duration) {
            return 'warning';
        }
        if (1 === project.id) {
            return 'danger';
        }
        return '';
    }
});

module.exports = MarkedRow;

