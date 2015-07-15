var Q = require('q');

var wrapTest = function (context, callback, fn) {

    var promise = Q.async(function () {
        return fn.call(context);
    });

    promise().catch(function (err) {
        callback.fail(err);
    });

};

exports.wrap = wrapTest;
