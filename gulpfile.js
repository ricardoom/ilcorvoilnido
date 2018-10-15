'use strict';
const gulp = require('gulp');

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');

const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();


// variables used in our sass tasks
const input = 'sass/**/*.scss';
const output = 'css';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

// autoprefixer options
// this covers 90.87% of all browsers. run npx autoprefixer --info to see full report.
const autoprefixerOptions = {
  browsers: ['last 10 versions', '> 5%', 'Firefox ESR'],
  flexbox: 'true',
  grid: 'true'
};

//
// main gulp task
//
gulp.task('sass', function () {
  return gulp.src(input)
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output))
    .pipe(browserSync.reload({ stream : true }));
});


gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port : 5678
  });

  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});



gulp.task('default', ['sass', 'serve']);