### Dependencies
* Install  [node.js](https://nodejs.org/)
* Install gulp: `npm install -g gulp` 
* Install http-server: `npm install -g http-server`

### Install
* Run `npm install`

### Development
* Run `gulp`
* Start a webservice in the `build` folder: `http-server -a localhost -p 3000`
* Go to `http://localhost:3000` to display the app
* Any changes to `app` or `styles` folder will automatically rebuild to `build` folder
* Application changes will refresh automatically in the browser

### Minify the code, ready for production
* Run `gulp deploy`

### Directory
* **app/**: Where you put your application files.
* **assets/**: Where you put your static files (f. ex. images, fonts, css themes).
* **build/**: Where your automatically builds to. This is where you launch your app in development (git ignores this folder).
* **dist/**: Where the deployed code exists, ready for production (git ignores this folder).
* **misc/**: Where you put any other files for the project needs (f. ex. code style setting for WebStorm).
* **styles/**: Where you put your styles.


### Useful stuff
* Flux Architecture [series](https://egghead.io/series/react-flux-architecture).
* A [collection](https://react.zeef.com/nick.raienko) of awesome React tools, resources, videos and shiny things.