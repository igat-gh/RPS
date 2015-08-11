/**
 * Contains application's setting.
 * @namespace Setting
 * @see List of all available formats for MomentJS you can find here: {@link http://momentjs.com/docs/#/displaying/format/}
 * @type {{date: {format: string, undefined: string}, duration: {format: string, undefined: string}, marker: {classNames: {project: string, selfEducation: string, absence: string, testPeriod: string}}, daysToWorkloadExpires: number}}
 */
var Settings = {
    /**
     * Date format for MomentJS
     */
    date: {
        format: 'MM/DD/YYYY',
        undefined: '-'
    },
    /**
     * Duration format for MomentJS
     */
    duration: {
        format: 'Y[y] M[m] W[w] D[d]',
        undefined: '-'
    },
    /**
     * CSS classes for marking rows in the Workload table
     */
    marker: {
        classNames: {
            project: 'project-type-project',
            selfEducation: 'project-type-selfeducation',
            absence: 'project-type-absence',
            testPeriod: 'project-type-test-period'
        }
    },
    /**
     * Marked the projects that expire after the number of days
     */
    daysToWorkloadExpires: 7
};

module.exports = Settings;