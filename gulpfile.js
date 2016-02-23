'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const esLint = require('gulp-eslint');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const paths = {
  build: 'build/',
  js: 'js/**/*.js'
};

gulp.task('browser-sync', () => {
  return browserSync.init({
    server: {
        baseDir: './'
    },
    ghostMode: false
  })
});

gulp.task('bs-reload', () => {
  return browserSync.reload();
});

// script
gulp.task('script', function() {
  return gulp
    .src(paths.js)
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(babel())
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(paths.build))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream())
});

gulp.task('default', ['script', 'browser-sync'], () => {
  gulp.watch(paths.js, ['script']);
  gulp.watch('*.html', ['bs-reload']);
});
