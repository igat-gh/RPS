var Dispatcher = require('flux').Dispatcher;
var React = require('react/addons');
var assign = require('object-assign');

/**
 * A singleton that operates as the central hub for application updates.
 * For more information visit https://facebook.github.io/flux/docs/dispatcher.html
 */
var AppDispatcher = assign(new Dispatcher(), {
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function (action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

module.exports = AppDispatcher;