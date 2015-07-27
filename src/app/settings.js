/**
 * @see List of all available formats you can find here: {@link http://momentjs.com/docs/#/displaying/format/}
 * @type {{date: {format: string, undefined: string}, duration: {format: string, undefined: string}, marker: {classNames: {project: string, selfEducation: string, absence: string, testPeriod: string}}, daysToWorkloadExpires: number}}
 */
var Settings = {
    date: {
        format: 'MM/DD/YYYY',
        undefined: '-'
    },
    duration: {
        format: 'Y[y] M[m] W[w] D[d]',
        undefined: '-'
    },
    marker: {
        classNames: {
            project: 'marker_project',
            selfEducation: 'marker_selfeducation',
            absence: 'marker_absence',
            testPeriod: 'marker_testperiod'
        }
    },
    daysToWorkloadExpires: 7
};

module.exports = Settings;