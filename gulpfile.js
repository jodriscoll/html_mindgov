var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    css_directory: 'assets/styles/css',
    sass_directory: 'assets/styles/scss'
};

paths.scss = [paths.sass_directory + '/app.scss'];

// Task to compile using compass
gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 7
        }))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .on('error', notify.onError({
            message: function (error) {
                return error.message;
            }
        }))
        .pipe(gulp.dest(paths.css_directory));
});

// Watch for files and run the appropriate task
gulp.task('watch', function () {
    gulp.watch(paths.scss, ['styles']);
});

gulp.task('default', ['styles', 'watch']);
