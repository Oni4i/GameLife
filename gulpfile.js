'use strict';

let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');

gulp.task('gulp-sass', function() {
    return gulp.src('./style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./"));
});

gulp.task('watch', function() {
    gulp.watch("./style.scss", gulp.parallel('gulp-sass'));
});

gulp.task('default', gulp.parallel('gulp-sass', 'watch'));
