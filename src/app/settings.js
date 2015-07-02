var Settings = {
    date: {
        // List of all available formats you can find here: http://momentjs.com/docs/#/displaying/format/
        format: 'MM/DD/YYYY',
        undefined: '-'
    },
    duration: {
        format: 'Y[y] M[m] W[w] D[d]',
        undefined: '-'
    },
    marker: {
        color: {
            default: 'default',
            danger: 'danger',
            warning: 'warning'
        }
    }
};

module.exports = Settings;