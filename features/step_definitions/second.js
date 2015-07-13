var myStepDefinitionsWrapper = function () {
    this.World = require('../support/world.js').World;

    this.Given('Im in "$module" module', function (module, callback) {
        callback.pending();
    });

    this.When(/^I filter employees by 'Selfeducation'$/, function (callback) {
        callback.pending();
    });

    this.Then(/^I see employees with 'Selfeducation' type of project at the moment$/, function (callback) {
        callback.pending();
    });

    this.Then(/^I don't see employees with any other type of project$/, function (callback) {
        callback.pending();
    });
};
module.exports = myStepDefinitionsWrapper;