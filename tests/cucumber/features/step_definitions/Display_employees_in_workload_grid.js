'use strict';

require('babel/polyfill');
var Q = require('q');

var myStepDefinitionsWrapper = function myStepDefinitionsWrapper() {
    this.World = require('../support/world.js').World;

    var wrapTest = function wrapTest(fn) {
        Q.async(fn)();
    };

    this.Given(/^I'm logged in as 'Admin'$/, function (callback) {
        var self = this;

        wrapTest(regeneratorRuntime.mark(function callee$2$0() {
            var emailInput, passwordInput, loginButton;
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.prev = 0;
                        context$3$0.next = 3;
                        return self.browser.get('http://localhost:3000/#/login');

                    case 3:
                        context$3$0.next = 5;
                        return self.browser.elementById('auth-email-input');

                    case 5:
                        emailInput = context$3$0.sent;
                        context$3$0.next = 8;
                        return self.browser.elementById('auth-password-input');

                    case 8:
                        passwordInput = context$3$0.sent;

                        emailInput.value = 'example@email.com';
                        passwordInput.value = 'password';
                        loginButton = self.browser.elementByClassName('login-btn');
                        context$3$0.next = 14;
                        return loginButton.click();

                    case 14:
                        callback();
                        context$3$0.next = 20;
                        break;

                    case 17:
                        context$3$0.prev = 17;
                        context$3$0.t0 = context$3$0['catch'](0);

                        callback.fail(context$3$0.t0);

                    case 20:
                    case 'end':
                        return context$3$0.stop();
                }
            }, callee$2$0, this, [[0, 17]]);
        }));
    });

    this.When('I navigate to "$module" module', function (module, callback) {
        var self = this;

        wrapTest(regeneratorRuntime.mark(function callee$2$0() {
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.prev = 0;
                        context$3$0.next = 3;
                        return self.browser.get('http://localhost:3000/#/' + module);

                    case 3:
                        callback();
                        context$3$0.next = 9;
                        break;

                    case 6:
                        context$3$0.prev = 6;
                        context$3$0.t0 = context$3$0['catch'](0);

                        callback.fail('Navigate to ' + module + ' fail ' + err);

                    case 9:
                    case 'end':
                        return context$3$0.stop();
                }
            }, callee$2$0, this, [[0, 6]]);
        }));
    });

    this.Then(/^I see table of employees$/, function (callback) {
        var self = this;

        wrapTest(regeneratorRuntime.mark(function callee$2$0() {
            var workloadGrid;
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.prev = 0;
                        context$3$0.next = 3;
                        return self.browser.waitForElementByClassName('workload-grid');

                    case 3:
                        workloadGrid = context$3$0.sent;

                        if (workloadGrid) {
                            callback();
                        } else {
                            callback.fail('Find workload table fail ' + err);
                        }

                        context$3$0.next = 10;
                        break;

                    case 7:
                        context$3$0.prev = 7;
                        context$3$0.t0 = context$3$0['catch'](0);

                        callback.fail('Find workload table fail ' + context$3$0.t0);

                    case 10:
                    case 'end':
                        return context$3$0.stop();
                }
            }, callee$2$0, this, [[0, 7]]);
        }));
    });

    this.Then(/^table contains columns$/, function (callback) {
        var self = this;

        wrapTest(regeneratorRuntime.mark(function callee$2$0() {
            var workloadGrid, rows;
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.prev = 0;
                        context$3$0.next = 3;
                        return self.browser.elementByClassName('workload-grid');

                    case 3:
                        workloadGrid = context$3$0.sent;

                        if (!workloadGrid) {
                            context$3$0.next = 9;
                            break;
                        }

                        context$3$0.next = 7;
                        return workloadGrid.elementsByCssSelector('tr');

                    case 7:
                        rows = context$3$0.sent;

                        if (rows.slice().length) {
                            callback();
                        } else {
                            callback.fail();
                        }

                    case 9:
                        context$3$0.next = 14;
                        break;

                    case 11:
                        context$3$0.prev = 11;
                        context$3$0.t0 = context$3$0['catch'](0);

                        callback.fail('Find workload table rows fail ' + err);

                    case 14:
                    case 'end':
                        return context$3$0.stop();
                }
            }, callee$2$0, this, [[0, 11]]);
        }));
    });
};

module.exports = myStepDefinitionsWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpc3BsYXlfZW1wbG95ZWVzX2luX3dvcmtsb2FkX2dyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMxQixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXJCLElBQUksd0JBQXdCLEdBQUcsU0FBM0Isd0JBQXdCLEdBQWU7QUFDdkMsUUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUM7O0FBRWxELFFBQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFhLEVBQUUsRUFBRTtBQUN6QixTQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDakIsQ0FBQzs7QUFFRixRQUFJLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLFVBQVUsUUFBUSxFQUFFO0FBQ3pELFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFaEIsZ0JBQVEseUJBQUM7Z0JBSUcsVUFBVSxFQUNWLGFBQWEsRUFHYixXQUFXOzs7Ozs7K0JBTFQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUM7Ozs7K0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDOzs7QUFBL0Qsa0NBQVU7OytCQUNZLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDOzs7QUFBckUscUNBQWE7O0FBQ2pCLGtDQUFVLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO0FBQ3ZDLHFDQUFhLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztBQUM3QixtQ0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDOzsrQkFDeEQsV0FBVyxDQUFDLEtBQUssRUFBRTs7O0FBQ3pCLGdDQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFFWCxnQ0FBUSxDQUFDLElBQUksZ0JBQU8sQ0FBQzs7Ozs7OztTQUc1QixFQUFDLENBQUM7S0FFTixDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxVQUFVLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDcEUsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixnQkFBUSx5QkFBQzs7Ozs7OytCQUdLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLE1BQU0sQ0FBQzs7O0FBQzNELGdDQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFFWCxnQ0FBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztTQUcvRCxFQUFDLENBQUM7S0FFTixDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxVQUFVLFFBQVEsRUFBRTtBQUN4RCxZQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLGdCQUFRLHlCQUFDO2dCQUdHLFlBQVk7Ozs7OzsrQkFBUyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLGVBQWUsQ0FBQzs7O0FBQTVFLG9DQUFZOztBQUVoQiw0QkFBSSxZQUFZLEVBQUU7QUFDZCxvQ0FBUSxFQUFFLENBQUM7eUJBQ2QsTUFBTTtBQUNILG9DQUFRLENBQUMsSUFBSSxDQUFDLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO3lCQUNwRDs7Ozs7Ozs7O0FBR0QsZ0NBQVEsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLGlCQUFRLENBQUMsQ0FBQzs7Ozs7OztTQUcxRCxFQUFDLENBQUM7S0FFTixDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxVQUFVLFFBQVEsRUFBRTtBQUN0RCxZQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLGdCQUFRLHlCQUFDO2dCQUVHLFlBQVksRUFHUixJQUFJOzs7Ozs7K0JBSGEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7OztBQUFyRSxvQ0FBWTs7NkJBRVosWUFBWTs7Ozs7OytCQUNLLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7OztBQUFyRCw0QkFBSTs7QUFFUiw0QkFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFO0FBQ3JCLG9DQUFRLEVBQUUsQ0FBQzt5QkFDZCxNQUFNO0FBQ0gsb0NBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDbkI7Ozs7Ozs7Ozs7QUFLTCxnQ0FBUSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztTQUU3RCxFQUFDLENBQUM7S0FFTixDQUFDLENBQUM7Q0FFTixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUMiLCJmaWxlIjoiRGlzcGxheV9lbXBsb3llZXNfaW5fd29ya2xvYWRfZ3JpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2JhYmVsL3BvbHlmaWxsJyk7XHJcbnZhciBRID0gcmVxdWlyZSgncScpO1xyXG5cclxudmFyIG15U3RlcERlZmluaXRpb25zV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuV29ybGQgPSByZXF1aXJlKCcuLi9zdXBwb3J0L3dvcmxkLmpzJykuV29ybGQ7XHJcblxyXG4gICAgdmFyIHdyYXBUZXN0ID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgUS5hc3luYyhmbikoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5HaXZlbigvXkknbSBsb2dnZWQgaW4gYXMgJ0FkbWluJyQvLCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHdyYXBUZXN0KGZ1bmN0aW9uKiAoKSB7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgc2VsZi5icm93c2VyLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwLyMvbG9naW4nKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbWFpbElucHV0ID0geWllbGQgc2VsZi5icm93c2VyLmVsZW1lbnRCeUlkKCdhdXRoLWVtYWlsLWlucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFzc3dvcmRJbnB1dCA9IHlpZWxkIHNlbGYuYnJvd3Nlci5lbGVtZW50QnlJZCgnYXV0aC1wYXNzd29yZC1pbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICdleGFtcGxlQGVtYWlsLmNvbSc7XHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZElucHV0LnZhbHVlID0gJ3Bhc3N3b3JkJztcclxuICAgICAgICAgICAgICAgIHZhciBsb2dpbkJ1dHRvbiA9IHNlbGYuYnJvd3Nlci5lbGVtZW50QnlDbGFzc05hbWUoJ2xvZ2luLWJ0bicpO1xyXG4gICAgICAgICAgICAgICAgeWllbGQgbG9naW5CdXR0b24uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5mYWlsKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLldoZW4oJ0kgbmF2aWdhdGUgdG8gXCIkbW9kdWxlXCIgbW9kdWxlJywgZnVuY3Rpb24gKG1vZHVsZSwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHdyYXBUZXN0KGZ1bmN0aW9uKiAoKSB7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgc2VsZi5icm93c2VyLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwLyMvJyArIG1vZHVsZSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suZmFpbCgnTmF2aWdhdGUgdG8gJyArIG1vZHVsZSArICcgZmFpbCAnICsgZXJyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLlRoZW4oL15JIHNlZSB0YWJsZSBvZiBlbXBsb3llZXMkLywgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICB3cmFwVGVzdChmdW5jdGlvbiogKCkge1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciB3b3JrbG9hZEdyaWQgPSB5aWVsZCBzZWxmLmJyb3dzZXIud2FpdEZvckVsZW1lbnRCeUNsYXNzTmFtZSgnd29ya2xvYWQtZ3JpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3b3JrbG9hZEdyaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5mYWlsKCdGaW5kIHdvcmtsb2FkIHRhYmxlIGZhaWwgJyArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suZmFpbCgnRmluZCB3b3JrbG9hZCB0YWJsZSBmYWlsICcgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5UaGVuKC9edGFibGUgY29udGFpbnMgY29sdW1ucyQvLCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHdyYXBUZXN0KGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2xvYWRHcmlkID0geWllbGQgc2VsZi5icm93c2VyLmVsZW1lbnRCeUNsYXNzTmFtZSgnd29ya2xvYWQtZ3JpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3b3JrbG9hZEdyaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHlpZWxkIHdvcmtsb2FkR3JpZC5lbGVtZW50c0J5Q3NzU2VsZWN0b3IoJ3RyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3dzLnNsaWNlKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suZmFpbCgnRmluZCB3b3JrbG9hZCB0YWJsZSByb3dzIGZhaWwgJyArIGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG15U3RlcERlZmluaXRpb25zV3JhcHBlcjsiXX0=
//# sourceMappingURL=Display_employees_in_workload_grid.js.map