var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-minify-css');

var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var reactify = require('reactify');

var isProduction = require('yargs').argv.production;
//var isProduction = false;

var path = {
    build: {
        js: 'build/assets/js/',
        html: 'build/',
        css: 'build/assets/css/',
        img: 'build/assets/img/',
        fonts: 'build/assets/fonts/'
    },
    src: {
        js: 'src/main.js',
        html: 'src/index.html',
        css: 'src/assets/css/*.css',
        img: 'src/assets/img/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    }
};

var bundler = browserify({
    entries: path.src.js,
    transform: [reactify],
    debug: true,
    fullPaths: true
});

gulp.task('build:js', function () {
    return bundler.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpif(!isProduction, sourcemaps.init({loadMaps: true})))
        .on('error', gutil.log)
        .pipe(gulpif(!isProduction, sourcemaps.write('./')))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build:html', function () {
    gulp.src(path.src.html).pipe(gulp.dest(path.build.html));
});

gulp.task('build:img', function () {
    gulp.src(path.src.img).pipe(gulp.dest(path.build.img));
});

gulp.task('build:fonts', function () {
    gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task('build:css', function () {
    gulp.src(path.src.css).pipe(gulp.dest(path.build.css));
});

gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});

gulp.task('build', [
    'build:html',
    'build:js',
    'build:css',
    'build:fonts',
    'build:img'
]);

gulp.task('default', ['build']);

gulp.task('watch', function () {
    watch('src/**/*.*', function (event, cb) {
        gulp.start('default');
    });
});
