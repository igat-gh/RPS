/* var Api = require('./api'); // Uncomment this line when will use api service */
var Promise = require('es6-promise').Promise;
/* Delete this line when will use api service */
var moment = require('moment');

var _employees = [
    {
        id: 1,
        name: 'Atroshkin, Igor',
        projects: [
            {
                id: 2,
                title: 'Test Period',
                date_start: +moment('2015-07-08'),
                date_end: +moment('2015-08-07')
            }
        ]
    },
    {
        id: 2,
        name: 'Bozhik, Stepan',
        projects: [
            {
                id: 10001,
                title: 'Paxton Access - Net10 UI',
                date_start: +moment('2014-06-01'),
                date_end: null
            }
        ]
    },
    {
        id: 3,
        name: 'Bronishevsky, Vladislav',
        projects: [
            {
                id: 10002,
                title: 'Accela - BoardTraq',
                date_start: +moment('2014-05-01'),
                date_end: +moment('2015-04-30')
            },
            {
                id: 10003,
                title: 'Wren Kitchens - Planner',
                date_start: +moment('2015-05-01'),
                date_end: null
            }
        ]
    },
    {
        id: 4,
        name: 'Vasiliskin, Evgeny',
        projects: [
            {
                id: 10004,
                title: 'IRIS',
                date_start: +moment('2015-05-12'),
                date_end: +moment('2015-09-01')
            },
            {
                id: 10005,
                title: 'Forex',
                date_start: +moment('2014-09-01'),
                date_end: +moment('2015-05-11')
            }
        ]
    },
    {
        id: 5,
        name: 'Vasilyev, Aleksey',
        projects: [
            {
                id: 10006,
                title: 'Themis',
                date_start: +moment('2014-09-01'),
                date_end: null
            }
        ]
    },
    {
        id: 6,
        name: 'Volchetsky, Sergey',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-06-01'),
                date_end: +moment('2015-07-12')
            },
            {
                id: 10007,
                title: 'ZigZag',
                date_start: +moment('2015-07-15'),
                date_end: +moment('2015-08-15')
            }
        ]
    },
    {
        id: 7,
        name: 'Gorbach, Yuri',
        projects: [
            {
                id: 10006,
                title: 'Themis',
                date_start: +moment('2015-04-01'),
                date_end: null
            }
        ]
    },
    {
        id: 8,
        name: 'Grischenko, Anton',
        projects: [
            {
                id: 10008,
                title: 'SDVentures',
                date_start: +moment('2014-03-14'),
                date_end: null
            }
        ]
    },
    {
        id: 9,
        name: 'Gulidov, Vladimir',
        projects: [
            {
                id: 10003,
                title: 'Wren Kitchens - Planner',
                date_start: +moment('2015-06-01'),
                date_end: null
            }
        ]
    },
    {
        id: 10,
        name: 'Derevyago, Evgeny',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-06-01'),
                date_end: null
            }
        ]
    },
    {
        id: 111,
        name: 'Zinovyev, Evgeny',
        projects: [
            {
                id: 10,
                title: 'Annual Leave',
                date_start: +moment('2015-06-29'),
                date_end: +moment('2015-07-16')
            },
            {
                id: 10009,
                title: 'Kaspersky',
                date_start: +moment('2014-09-01'),
                date_end: null
            }
        ]
    },
    {
        id: 12,
        name: 'Zmitrovich, Evgeny',
        projects: [
            {
                id: 10006,
                title: 'Themis',
                date_start: +moment('2014-09-01'),
                date_end: null
            }
        ]
    },
    {
        id: 13,
        name: 'Karaychenstev, Vladimir',
        projects: [
            {
                id: 10006,
                title: 'Themis',
                date_start: +moment('2015-05-01'),
                date_end: null
            }
        ]
    },
    {
        id: 14,
        name: 'Korol, Sergey',
        projects: [
            {
                id: 10010,
                title: 'Becton Dickinson',
                date_start: +moment('2014-05-01'),
                date_end: +moment('2014-06-30')
            },
            {
                id: 1001011,
                title: 'QuantumVerse',
                date_start: +moment('2014-07-01'),
                date_end: +moment('2014-08-31')
            },
            {
                id: 10,
                title: 'Annual Leave',
                date_start: +moment('2014-07-13'),
                date_end: +moment('2014-07-28')
            }
        ]
    },
    {
        id: 15,
        name: 'Korzun, Yuri',
        projects: [
            {
                id: 10001,
                title: 'Paxton Access - Net10 UI',
                date_start: +moment('2014-09-01'),
                date_end: null
            }
        ]
    },
    {
        id: 16,
        name: 'Krischik, Ignat',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2014-07-01'),
                date_end: null
            }
        ]
    },
    {
        id: 17,
        name: 'Labushkina, Anna',
        projects: [
            {
                id: 10005,
                title: 'Forex',
                date_start: +moment('2014-09-01'),
                date_end: null
            }
        ]
    },
    {
        id: 18,
        name: 'Legovich, Andrey',
        projects: [
            {
                id: 10008,
                title: 'SDVentures',
                date_start: +moment('2014-03-14'),
                date_end: null
            }
        ]
    },
    {
        id: 19,
        name: 'Maslovsky, Vadim',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-06-01'),
                date_end: null
            }
        ]
    },
    {
        id: 20,
        name: 'Mironov, Georgy',
        projects: [
            {
                id: 100011,
                title: 'Productive Edge',
                date_start: +moment('2015-05-01'),
                date_end: null
            }
        ]
    },
    {
        id: 21,
        name: 'Nekazakova, Natalya',
        projects: [
            {
                id: 100012,
                title: 'Pull Media',
                date_start: +moment('2015-05-01'),
                date_end: +moment('2015-07-31')
            }
        ]
    },
    {
        id: 22,
        name: 'Nikolaychik, Mihail',
        projects: [
            {
                id: 100013,
                title: 'Edyt',
                date_start: +moment('2014-10-01'),
                date_end: null
            }
        ]
    },
    {
        id: 23,
        name: 'Novogrodsky, Denis',
        projects: [
            {
                id: 10006,
                title: 'Themis',
                date_start: +moment('2014-10-01'),
                date_end: null
            }
        ]
    },
    {
        id: 24,
        name: 'Petrov, Andrey',
        projects: [
            {
                id: 100014,
                title: 'Accela',
                date_start: +moment('2015-05-01'),
                date_end: null
            }
        ]
    },
    {
        id: 25,
        name: 'Poddubsky, Mihail',
        projects: [
            {
                id: 100001,
                title: 'Paxton Access - Net10 UI',
                date_start: +moment('2015-01-01'),
                date_end: null
            }
        ]
    },
    {
        id: 26,
        name: 'Polyakova, Kira',
        projects: [
            {
                id: 10008,
                title: 'SDVentures',
                date_start: +moment('2014-03-14'),
                date_end: null
            }
        ]
    },
    {
        id: 27,
        name: 'Radyuk, Tatiana',
        projects: [
            {
                id: 100015,
                title: 'OPUS',
                date_start: +moment('2015-06-01'),
                date_end: +moment('2015-06-30')
            },
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-07-01'),
                date_end: null
            }
        ]
    },
    {
        id: 28,
        name: 'Rumyantsev, Pavel',
        projects: [
            {
                id: 100016,
                title: 'FPX - ePDM',
                date_start: +moment('2015-05-01'),
                date_end: +moment('2015-09-30')
            }
        ]
    },
    {
        id: 29,
        name: 'Semigradsky, Dmitry',
        projects: [
            {
                id: 100008,
                title: 'SDVentures',
                date_start: +moment('2015-05-01'),
                date_end: null
            }
        ]
    },
    {
        id: 30,
        name: 'Sinkevich, Victoriya',
        projects: [
            {
                id: 100017,
                title: 'Itransition.com',
                date_start: +moment('2015-06-01'),
                date_end: +moment('2015-07-15')
            }
        ]
    },
    {
        id: 31,
        name: 'Sinkevich, Sergey',
        projects: [
            {
               id: 10006,
                title: 'Themis',
                date_start: +moment('2014-09-01'),
                date_end: null
            }
        ]
    },
    {
        id: 32,
        name: 'Sitko, Stefan',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-29-06'),
                date_end: null
            }
        ]
    },
    {
        id: 33,
        name: 'Skakun, Aleksey',
        projects: [
            {
                id: 10001,
                title: 'Paxton Access - Net10 UI',
                date_start: +moment('2014-06-01'),
                date_end: null
            }
        ]
    },
    {
        id: 34,
        name: 'Sokolovsky, Aleksandr',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-29-06'),
                date_end: null
            }
        ]
    },
    {
        id: 35,
        name: 'Sologub, Evgeny',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-29-06'),
                date_end: null
            }
        ]
    },
    {
        id: 36,
        name: 'Strigo, Denis',
        projects: [
            {
                id: 100013,
                title: 'Edyt',
                date_start: +moment('2014-10-01'),
                date_end: null
            }
        ]
    },
    {
        id: 37,
        name: 'Tarasyuk, Nina',
        projects: [
            {
                id: 100018,
                title: 'BI Tool',
                date_start: +moment('2015-06-12'),
                date_end: null
            }
        ]
    },
    {
        id: 38,
        name: 'Truhan, Veronika',
        projects: [
            {
                id: 10001,
                title: 'Paxton Access - Net10 UI',
                date_start: +moment('2014-06-01'),
                date_end: null
            }
        ]
    },
    {
        id: 39,
        name: 'Tuleyko, Evgeny',
        projects: [
            {
                id: 10001,
                title: 'Paxton Access - Net10 UI',
                date_start: +moment('2015-01-01'),
                date_end: null
            }
        ]
    },
    {
        id: 40,
        name: 'Tylindus, Anastasiya',
        projects: [
            {
                id: 100014,
                title: 'Accela',
                date_start: +moment('2015-05-01'),
                date_end: null
            }
        ]
    },
    {
        id: 41,
        name: 'Tyshkovets, Sergey',
        projects: [
            {
               id: 10006,
                title: 'Themis',
                date_start: +moment('2014-09-01'),
                date_end: null
            }
        ]
    },
    {
        id: 42,
        name: 'Chuev, Aleksandr',
        projects: [
            {
                id: 100013,
                title: 'Edyt',
                date_start: +moment('2015-04-01'),
                date_end: null
            }
        ]
    },
    {
        id: 43,
        name: 'Shklyarik, Viktoriya',
        projects: [
            {
                id: 10001,
                title: 'Paxton Access - Net10 UI',
                date_start: +moment('2015-01-01'),
                date_end: null
            }
        ]
    },
    {
        id: 44,
        name: 'Shcherbakov, Aleksandr',
        projects: [
            {
                id: 100011,
                title: 'Productive Edge',
                date_start: +moment('2015-05-01'),
                date_end: null
            }
        ]
    },
    {
        id: 45,
        name: 'Yatsuk, Egor',
        projects: [
            {
                id: 1,
                title: 'Selfeducation',
                date_start: +moment('2015-29-06'),
                date_end: null
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
        });
    }
};

module.exports = Employee;