var Moment = require('moment');

/**
 * Gets Moment.js duration object from its string presentation.
 * @method durationFromHumanizedString
 * @memberOf Moment
 *
 * @param {string} duration Human readable duration, e.g. '1 week'
 * @return {object} Moment.js duration object.
 */
if (typeof Moment.durationFromHumanizedString !== 'function') {
    Moment.durationFromHumanizedString = function(duration) {
        var dateString = duration.split(' ');
        return Moment.duration(+dateString[0], dateString[1]);
    };
}