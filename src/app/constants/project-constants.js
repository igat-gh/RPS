/**
 * Project type constants
 * @namespace ProjectConstants
 * @type {array}
 * @see TODO - structure AppConstants for API as for example: {@link http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/}
 */
module.exports = {
    /** Represents standard project types */
    TYPE_PROJECT: 1,

    /** This constant represents self-education types of projects, e.g. when employee is not assigned to any specific project and is studying some technology */
    TYPE_SELFEDUCATION: 2,

    /** Represents absence types of projects, such as annual leaves, sick leaves, vacations. */
    TYPE_ABSENCE: 3,

    /** Represents project types for probation periods */
    TYPE_TEST_PERIOD: 4
};
