var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');

chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var browserPromiseChainRemote = wd.promiseChainRemote();

var World = function World(callback) {
    this.browser = browserPromiseChainRemote;

    this.browser.init({browserName: 'chrome'}).then(function () {
        callback();
    });
};

exports.World = World;