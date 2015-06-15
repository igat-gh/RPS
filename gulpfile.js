var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var rimraf = require('rimraf');

gulp.task('browserify', function () {
    gulp.src('src/main.js')
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('copy', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('build/assets'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', function () {
    watch('src/**/*.*', function (event, cb) {
        gulp.start('default');
    });
});

gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});
