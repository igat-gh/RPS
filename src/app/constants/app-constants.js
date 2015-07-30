/**
 * Constants of action type names
 * @namespace AppConstants
 * @type {array}
 * @see TODO - structure AppConstants for API as for example: {@link http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/}
 */
module.exports = {
    /** Represent login action type. This action will be created when a user submits an authorization form */
    AUTH_LOG_IN: 'AUTH_LOG_IN',

    /** Represent logout action type  */
    AUTH_LOG_OUT: 'AUTH_LOG_OUT',

    /** Represent action, when we receive all employers */
    RECEIVE_EMPLOYEES: 'RECEIVE_EMPLOYEES',

    /** Represent action, when a user set a filter for employers */
    SET_FILTER: 'SET_FILTER'
};