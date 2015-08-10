### Dependencies
* Install  [node.js](https://nodejs.org/)
* Install gulp: `npm install -g gulp` 
* Install http-server: `npm install -g http-server`

### Directory
* **build/** Where your automatically builds to.
* **build/release/** Ready for production code exists here (git ignores this folder).
* **build/dev/**: This is where you launch your app in development (git ignores this folder).
* **misc/**: Where you put any other files for the project needs (f. ex. code style setting for WebStorm).
* **src/** All sources are here.
* **src/app/**: Where you put your application files.
* **src/assets/**: Where you put your static files (f. ex. images, fonts).
* **src/styles/**: Where you put your styles.
* **tests/**: Where you put tests

### Install
* Run `npm install`

### Development
* Run `gulp`
* Start a webservice in the root project directory: `http-server build/dev -a localhost -p 3000 -o`
* Any changes to `src/app` or `src/styles` folder will automatically rebuild to `build/dev` folder and application changes will refresh automatically in the browser

### Minify the code, ready for production
* Run `gulp deploy`

### Run tests
* Start a webservice in the root project directory: `http-server build/dev -a localhost -p 3000`
* To run all tests execute `gulp cucumber`, prints a result to the console
* To run all tests with report to the JUNIT execute `gulp cucumber-jUnit`, outputs result to output_JUnit.xml file in tests/cucumber folder.

### Stack
In the frontend uses [React](http://facebook.github.io/react/) for the views, the data flow organized with [Flux](http://facebook.github.io/flux/docs/overview.html) architecture.
Also uses custom bootstrap [theme](http://bootswatch.com/paper/) and LESS as a CSS preprocessor. 

### Useful stuff
* Comprehensive [Guide](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/) to Building Apps with React.js
* React.js [documentation](http://tftf.ru/stati/javascript/reactjs/) translated to Russian. 
* Flux Architecture [series](https://egghead.io/series/react-flux-architecture).
* Flux & React [Best Practices](http://racingtadpole.com/blog/flux-react-best-practices/)
* A [collection](https://react.zeef.com/nick.raienko) of awesome React tools, resources, videos and shiny things.

### Info Cucumber + Selenium
* [Selenium-Webdriver] (https://github.com/SeleniumHQ/selenium)
* [Selenium-Webdriver API] (http://seleniumhq.github.io/selenium/docs/api/javascript/)
* [Cucumber-js] (https://github.com/cucumber/cucumber-js)
* [Gherkin syntax examples] (http://docs.behat.org/en/latest/guides/1.gherkin.html)
* Features are written with the [Gherkin syntax] (https://github.com/cucumber/cucumber/wiki/Gherkin)

### Project materials
Wiki [page](https://wiki.itransition.com/display/RPS/Resource+Planning+System+Home)