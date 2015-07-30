var assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;
var React = require('react/addons');

/**
 * A singleton that operates as the central hub for application updates.
 * @see For more information visit {@link https://facebook.github.io/flux/docs/dispatcher.html}
 * @module AppDispatcher
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
    },

    /**
     * @param {function} f
     * Method that shows exceptions hidden by Dispatcher
     * @see For more info about hidden exceptions visit {@link http://cjlarose.com/2014/12/09/flux-show-exceptions.html}
     */
    showErrors: function (f) {
        return function () {
            try {
                f.apply(this, arguments);
            } catch (e) {
                console.error(e.stack);
            }
        };
    },

    /**
     * @param {function} f
     * Method that registers function that shows exceptions hidden by Dispatcher
     * @see For more info about hidden exceptions visit {@link http://cjlarose.com/2014/12/09/flux-show-exceptions.html}
     */
    register: function (f) {
        return Dispatcher.prototype.register.call(this, this.showErrors(f));
    }
});

module.exports = AppDispatcher;