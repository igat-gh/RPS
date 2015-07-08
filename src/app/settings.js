var Settings = {
    date: {
        // List of all available formats you can find here: http://momentjs.com/docs/#/displaying/format/
        format: 'MM/DD/YYYY',
        undefined: '-'
    },
    duration: {
        // More about formats you can fund here: https://github.com/jsmreese/moment-duration-format#template
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