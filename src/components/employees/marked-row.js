var React = require('react');
var Moment = require('moment');

var MarkedRow = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        this.props.data = nextProps.data;
    },
    render: function () {
        var data = this.props.data;
        var toBeOrNotToBe = data.projectIndex > 0 ? null : <td rowSpan={data.projectsLength}>{data.employeeName}</td>;
        var style = {backgroundColor: this.getBgColor()};
        return (
            <tr>
                {toBeOrNotToBe}
                <td style={style}>{data.project.title}</td>
                <td style={style}>{Moment(data.project.date_start).format('MMMM Do YYYY')}</td>
                <td style={style}>{Moment(data.project.date_end).format('MMMM Do YYYY')}</td>
            </tr>
        )
    },
    getBgColor: function () {
        var project = this.props.data.project;
        // TODO: delegate this hardcoded functionality
        if (project.title === 'Selfeducation') {
            return '#FF765F';
        }
        var timeLeft = Moment.duration(project.date_end - Moment()).asMilliseconds();
        var duration = Moment.duration(7, 'days').asMilliseconds();
        if (timeLeft > 0 && timeLeft <= duration) {
            return '#FFD086';
        }
        return 'transparent';
    }
});

module.exports = MarkedRow;

