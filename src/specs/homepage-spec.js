var Home = require('../app/components/home/home');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("Home page", function() {

    it('Should render: Resource Planning System', function() {
        var app = TestUtils.renderIntoDocument(React.createElement(Home));
        expect(React.findDOMNode(app).textContent).toEqual('Resource Planning System');
    });

});

