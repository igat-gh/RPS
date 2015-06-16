var Api = require('./api');
var Promise = require('es6-promise').Promise;
var moment = require('moment');

var _employees = [
    {
        id: 1,
        name: 'John Smith',
        projects: [
            {
                id: 1,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-03-25'),
                date_end: +moment('2015-06-29')
            },
            {
                id: 2,
                title: 'Selfeducation',
                date_start: +moment('2014-03-25'),
                date_end: +moment('2015-07-29')
            },
            {
                id: 3,
                title: 'DSM',
                date_start: +moment('2014-03-25'),
                date_end: +moment('2014-03-25')
            }
        ]
    },
    {
        id: 2,
        name: 'John Doe',
        projects: [
            {
                id: 1,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-06-01'),
                date_end: +moment('2015-06-15')
            }
        ]
    },
    {
        id: 3,
        name: 'Kate Doe',
        projects: [
            {
                id: 1,
                title: 'Itransition RFX Processing',
                date_start: +moment('2015-02-25'),
                date_end: +moment('2016-03-25')
            },
            {
                id: 2,
                title: 'Selfeducation',
                date_start: +moment('2015-04-30'),
                date_end: +moment('2015-12-25')
            }
        ]
    }
];

var Employee = {
    fetch: function () {
        // imitate request
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(_employees);
            }, 1000);
        })
    }
};

module.exports = Employee;