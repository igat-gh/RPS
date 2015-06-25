var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var preprocess = require('gulp-preprocess');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var react = require('gulp-react');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react'
];

var browserifyTask = function (options) {

    // Our app bundler
    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: options.development, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
    });

    // We set our dependencies as externals on our app bundler when developing
    (options.development ? dependencies : []).forEach(function (dep) {
        appBundler.external(dep);
    });

    // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('main.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(gulpif(options.development, livereload()))
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();

    // We create a separate bundle for our dependencies as they
    // should not rebundle on file changes. This only happens when
    // we develop. When deploying the dependencies will be included
    // in the application bundle
    if (options.development) {

        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });

        // Run the vendor bundle
        var start = new Date();
        console.log('Building VENDORS bundle');
        vendorsBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
            }));
    }

};

var cssTask = function (options) {
    if (options.development) {
        var run = function () {
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(concat('main.css'))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));
    }
};

var htmlTask = function (options) {
    var start = new Date();
    console.log('Building HTML bundle');
    gulp.src(options.src)
        .pipe(preprocess({context: { DEVELOPMENT: options.development}})) //To set environment variables in-line
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
            console.log('HTML bundle built in ' + (Date.now() - start) + 'ms');
        }));
};

// Development build
gulp.task('default', function () {

    browserifyTask({
        development: true,
        src: './src/app/main.js',
        dest: './build/dev'
    });

    cssTask({
        development: true,
        src: './src/styles/**/*.css',
        dest: './build/dev'
    });

    htmlTask({
        development: true,
        src: './src/app/index.html',
        dest: './build/dev'
    });
});

// Production build
gulp.task('deploy', function () {

    browserifyTask({
        development: false,
        src: './src/app/main.js',
        dest: './build/prod'
    });

    cssTask({
        development: false,
        src: './src/styles/**/*.css',
        dest: './build/prod'
    });

    htmlTask({
        development: false,
        src: './src/app/index.html',
        dest: './build/prod'
    });
});

gulp.task('jshint', function () {
    gulp.src('./src/app/**/*.js')
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});