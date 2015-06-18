// var Api = require('./api'); // Uncomment this line when will use api service
var Promise = require('es6-promise').Promise; // Delete this line when will use api service
var moment = require('moment');

var _employees = [
    {
        id: 1,
        name: 'David Flanagan',
        projects: [
            {
                id: 3,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-03-25'),
                date_end: null
            },
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2014-03-25'),
                date_end: null
            },
            {
                id: 6,
                title: 'DSM',
                date_start: +moment('2014-03-14'),
                date_end: +moment('2015-06-22')
            }
        ]
    },
    {
        id: 2,
        name: 'John Doe',
        projects: [
            {
                id: 3,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-06-01'),
                date_end: +moment('2015-06-15')
            }
        ]
    },
    {
        id: 3,
        name: 'John Smith',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-04-30'),
                date_end: +moment('2015-12-25')
            },
            {
                id: 3,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-02-25'),
                date_end: +moment('2016-03-25')
            }
        ]
    },
    {
        id: 4,
        name: 'Martin Fuller',
        projects: [
            {
                id: 4,
                title: 'DSM',
                date_start: +moment('2014-03-14'),
                date_end: +moment('2015-09-25')
            },
            {
                id: 5,
                title: 'IRIS',
                date_start: +moment('2014-03-25'),
                date_end: +moment('2015-07-29')
            },
            {
                id: 2,
                title: 'Absence',
                date_start: +moment('2015-05-25'),
                date_end: +moment('2015-06-29')
            }
        ]
    },
    {
        id: 11,
        name: 'David Flanagan',
        projects: [
            {
                id: 3,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-03-25'),
                date_end: +moment('2015-06-29')
            },
            {
                id: 6,
                title: 'WD Hiring Activities',
                date_start: +moment('2014-03-25'),
                date_end: +moment('2015-07-29')
            },
            {
                id: 4,
                title: 'DSM',
                date_start: +moment('2014-03-14'),
                date_end: +moment('2015-06-22')
            }
        ]
    },
    {
        id: 21,
        name: 'John Doe',
        projects: [
            {
                id: 3,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-06-01'),
                date_end: +moment('2015-07-15')
            }
        ]
    },
    {
        id: 31,
        name: 'John Smith',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-04-30'),
                date_end: +moment('2015-12-25')
            },
            {
                id: 3,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-02-25'),
                date_end: +moment('2016-03-25')
            }
        ]
    },
    {
        id: 41,
        name: 'Martin Fuller',
        projects: [
            {
                id: 4,
                title: 'DSM',
                date_start: +moment('2014-03-14'),
                date_end: +moment('2015-06-25')
            },
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2014-03-25'),
                date_end: +moment('2015-07-29')
            },
            {
                id: 2,
                title: 'Absence',
                date_start: +moment('2015-03-25'),
                date_end: +moment('2015-06-29')
            }
        ]
    }
];

var Employee = {
    fetch: function () {
        // Imitate request. With real request we will use Api service.
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(_employees);
            }, 1000);
        })
    }
};

module.exports = Employee;