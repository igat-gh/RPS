/**
 * Constants of action type names
 * @namespace Constants
 * @type {object}
 */
module.exports = {
    /** Represent log in action type. This action will be created when a user submits an authorization form */
    AUTH_LOG_IN: 'AUTH_LOG_IN',

    /** Represent log out action type  */
    AUTH_LOG_OUT: 'AUTH_LOG_OUT',

    /** Represent action, when we receive all employers */
    RECEIVE_EMPLOYEES: 'RECEIVE_EMPLOYEES',

    /** Represent action, when a user set a filter for employers */
    SET_FILTER: 'SET_FILTER'
};