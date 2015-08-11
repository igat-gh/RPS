## Project Materials
Please read [this Wiki page](https://wiki.itransition.com/display/RPS/Resource+Planning+System+Home) to get general understanding on the project business needs and requirements.

## Prerequesites
* [Node.js](https://nodejs.org) is used as a development platform.
* [NPM](https://www.npmjs.com) is used as a package manager for JavaScript libraries.

NPM global packages

* Install gulp: `npm install -g gulp`.
* Install http-server: `npm install -g http-server`.

## Solution Folders
* **src/** contains all sources files of the app.
* **src/app/** contains all application logic - reusable ui components, data services, actions, dispatchers, routers etc.
* **src/assets/** contains static, logic-less files - images, web fonts, flash and svg files.
* **src/styles/** contains application styles written in LESS.
* **tests/** contains test suite and automated tests for the application.
* **misc/** contains other files for the project needs (e.g. code style setting for WebStorm).

## Build
* Run `npm install`

### Development
* Run `gulp` to build development version of the app with live reload feature enabled.
* Start a webservice in the root project directory: `http-server build/dev -a localhost -p 3000 -o`.
* Any changes to `src/app` or `src/styles` folder will automatically rebuild to `build/dev` folder and application changes will refresh automatically in the browser.

### Test
* Run `gulp test` to build test version of the app. Minifies all assets, JavaScripts, CSS, HTML files as well as creates source maps for easy debugging in case any bug is found during test session.

### Release
* Run `gulp release` to build release version of the app. Is used for production package creation, minifies all assets, JavaScripts, CSS, HTML files, but never creates source maps.

## Run Automated Tests
* Start a webservice in the root project directory: `http-server build/dev -a localhost -p 3000`.
* To run all tests execute `gulp cucumber`, prints a result to the console.
* To run all tests with report to the JUNIT execute `gulp cucumber-jUnit`, outputs result to output_JUnit.xml file in tests/cucumber folder.

## Useful Information
### Development Stack
In the frontend uses [React](http://facebook.github.io/react/) for the views, the data flow organized with [Flux](http://facebook.github.io/flux/docs/overview.html) architecture.
Also uses custom bootstrap [theme](http://bootswatch.com/paper/) and LESS as a CSS preprocessor. 
* Comprehensive [Guide](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/) to Building Apps with React.js
* React.js [documentation](http://tftf.ru/stati/javascript/reactjs/) translated to Russian. 
* Flux Architecture [series](https://egghead.io/series/react-flux-architecture).
* Flux & React [Best Practices](http://racingtadpole.com/blog/flux-react-best-practices/).
* A [collection](https://react.zeef.com/nick.raienko) of awesome React tools, resources, videos and shiny things.

### Automated Testing Tools
* [Cucumber-js](https://github.com/cucumber/cucumber-js) is used for automated testing.
* [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin) is used for test cases and features specification.
* [Gherkin syntax examples](http://docs.behat.org/en/latest/guides/1.gherkin.html) would be nice to read before dealing with test features.
* [Selenium-Webdriver](https://github.com/SeleniumHQ/selenium) is used to access DOM elements during UI testing.
* [Selenium-Webdriver JavaScript API](http://seleniumhq.github.io/selenium/docs/api/javascript/) is used as a JavaScript implementation of Webdriver API.