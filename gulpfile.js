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
var glob = require('glob');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var jsdoc = require('gulp-jsdoc');
var exec = require('gulp-exec');
var addsrc = require('gulp-add-src');
var del = require('del');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'array.prototype.find',
    'es6-promise',
    'events',
    'flux',
    'moment',
    'moment-duration-format',
    'object-assign',
    'react',
    'react/addons',
    'react-router',
    'superagent'
];

var environment = {
    development: 'development',
    test: 'test',
    release: 'release'
};

var browserifyTask = function (options) {
    // Our app bundler
    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
        transform: [reactify], // We want to convert JSX to normal javascript
        cache: {}, packageCache: {}, fullPaths: options.environment !== environment.release // Requirement of watchify
    });

    // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler
            .external(dependencies)
            .bundle()
            .on('error', gutil.log)
            .pipe(source('main.js'))
            .pipe(gulpif(options.environment !== environment.release, streamify(sourcemaps.init())))
            .pipe(gulpif(options.environment !== environment.development, streamify(uglify())))
            .pipe(streamify(sourcemaps.write()))
            .pipe(gulp.dest(options.dest))
            .pipe(gulpif(options.environment === environment.development, livereload()))
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.environment === environment.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();

    // We create a separate bundle for our dependencies as they
    // should not rebundle on file changes.
    var vendorsBundler = browserify({
        require: dependencies
    });

    // Run the vendor bundle
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
        .on('error', gutil.log)
        .pipe(source('vendors.js'))
        .pipe(gulpif(options.environment !== environment.release, streamify(sourcemaps.init())))
        .pipe(gulpif(options.environment !== environment.development, streamify(uglify())))
        .pipe(streamify(sourcemaps.write()))
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
            console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
        }));

};

var cssTask = function (options) {
    if (options.environment === environment.development) {
        var run = function () {
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(sourcemaps.init())
                .pipe(less())
                .pipe(concat(options.name + '.css'))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(gulpif(options.environment === environment.test, sourcemaps.init()))
            .pipe(less())
            .pipe(concat(options.name + '.css'))
            .pipe(cssmin())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.dest));
    }
};

var htmlTask = function (options) {
    var start = new Date();
    console.log('Building HTML bundle');
    gulp.src(options.src)
        .pipe(preprocess({context: {DEVELOPMENT: options.environment === environment.development}})) //To set environment variables in-line
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
            console.log('HTML bundle built in ' + (Date.now() - start) + 'ms');
        }));
};

var assetsTask = function (options) {
    var start = new Date();
    console.log('Building Assets bundle');
    gulp.src(options.src)
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
            console.log('Assets bundle built in ' + (Date.now() - start) + 'ms');
        }));
};


var cleanUpTask = function (options, done) {
    del(options.path, done);
};

// Development build
gulp.task('default', ['jshint', 'jsdoc'], function () {
    cleanUpTask({
            path: ['./build/dev/']
        },
        function () {
            browserifyTask({
                environment: environment.development,
                src: './src/app/main.js',
                dest: './build/dev/scripts'
            });

            cssTask({
                environment: environment.development,
                src: ['./src/styles/main.less'],
                name: 'styles',
                dest: './build/dev/styles'
            });

            cssTask({
                environment: environment.development,
                src: ['./node_modules/bootstrap/less/bootstrap.less'],
                name: 'libs',
                dest: './build/dev/styles'
            });

            htmlTask({
                environment: environment.development,
                src: './src/app/index.html',
                dest: './build/dev'
            });

            assetsTask({
                environment: environment.development,
                src: './src/assets/**/*',
                dest: './build/dev/assets'
            });
        });
});

//Test build
gulp.task('test', ['jshint'], function () {
    cleanUpTask({
            path: ['./build/test/']
        },
        function () {
            browserifyTask({
                environment: environment.test,
                src: './src/app/main.js',
                dest: './build/test/scripts'
            });

            cssTask({
                environment: environment.test,
                src: ['./src/styles/main.less'],
                name: 'styles',
                dest: './build/test/styles'
            });

            cssTask({
                environment: environment.test,
                src: ['./node_modules/bootstrap/less/bootstrap.less'],
                name: 'libs',
                dest: './build/test/styles'
            });

            htmlTask({
                environment: environment.test,
                src: './src/app/index.html',
                dest: './build/test'
            });

            assetsTask({
                environment: environment.test,
                src: './src/assets/**/*',
                dest: './build/test/assets'
            });
        });
});

// Production build
gulp.task('release', ['jshint'], function () {
    cleanUpTask({
            path: ['./build/prod/']
        },
        function () {
            browserifyTask({
                environment: environment.release,
                src: './src/app/main.js',
                dest: './build/prod/scripts'
            });

            cssTask({
                environment: environment.release,
                src: ['./src/styles/main.less'],
                name: 'styles',
                dest: './build/prod/styles'
            });

            cssTask({
                environment: environment.release,
                src: ['./node_modules/bootstrap/less/bootstrap.less'],
                name: 'libs',
                dest: './build/prod/styles'
            });

            htmlTask({
                environment: environment.release,
                src: './src/app/index.html',
                dest: './build/prod'
            });

            assetsTask({
                environment: environment.release,
                src: './src/assets/**/*',
                dest: './build/prod/assets'
            });
        });
});

gulp.task('jshint', function () {
    gulp.src('./src/app/**/*.js')
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

var transformEs6TestStepsTask = function () {
    gulp.src('tests/cucumber/step_definitions_es6/*.js')
        .pipe(babel({
            sourceMaps: 'inline'
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest("tests/cucumber/features/step_definitions"));
};


var transformEs6SupportTask = function () {
    gulp.src('tests/cucumber/support_es6/*.js')
        .pipe(babel({
            sourceMaps: 'inline'
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest("tests/cucumber/features/support"));
};

//Transforms es6 cucumber test steps and support files
gulp.task('transform-es6', function () {
    transformEs6TestStepsTask();
    transformEs6SupportTask();
});

// Run tests
// Outputs result to console in pretty style
gulp.task('cucumber', ['transform-es6'], function () {
    return gulp.src('*')
        .pipe(exec('cd tests/cucumber && ..\\..\\node_modules\\.bin\\cucumber-js --format=pretty',
            function (err, stdOut) {
                console.log(stdOut);
                err && console.log(err);
            }));
});

// Run tests
// Outputs result to output_JUnit.xml file in tests/cucumber folder
gulp.task('cucumber-jUnit', ['transform-es6'], function () {
    return gulp.src('*')
        .pipe(exec('cd tests/cucumber && ..\\..\\node_modules\\.bin\\cucumber-js --format=json ' +
            '| ..\\..\\node_modules\\.bin\\cucumber-junit > cucumber_jUnit_results.xml'));
});

gulp.task('jsdoc', function () {
    gulp.src('./src/**/*.js')
        .pipe(react())
        .pipe(addsrc('README.md'))
        .pipe(jsdoc.parser())
        .pipe(jsdoc.generator('./docs'));

});