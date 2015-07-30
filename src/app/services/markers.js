/* var Api = require('./api'); // Uncomment this line when will use api service */
var Promise = require('es6-promise').Promise;
/* Delete this line when will use api service */

var _markers = [];

/**
 * Stores the value of markers in private array, simulates requests.
 * @class
 */
var Markers = {
    /**
     * Imitate request. With real request we will use Api service.
     * @return {*}
     */
    fetch: function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(_markers);
            }, 1000);
        });
    },
    /**
     * Change array _markers
     * @param {array} markersList List of new markers
     */
    setMarkers: function (markersList) {
        _markers = markersList;
    }
};

module.exports = Markers;