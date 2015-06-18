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
                <td style={style}>{data.project.date_end ? Moment(data.project.date_end).format('MMMM Do YYYY') : '(not set)'}</td>
            </tr>
        )
    },
    getBgColor: function () {
        // TODO: Delegate this hardcoded functionality. Think about how to store markers in db and how to present them in json structure
        var project = this.props.data.project,
            timeLeft = Moment.duration(project.date_end - Moment()),
            duration = Moment.duration(7, 'days');
        if (timeLeft > 0 && timeLeft <= duration) {
            return '#FFD086';
        }
        if (1 === project.id) {
            return '#FF765F';
        }
        return 'transparent';
    }
});

module.exports = MarkedRow;

