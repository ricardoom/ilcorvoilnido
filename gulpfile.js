'use strict';
const gulp = require('gulp');

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

// const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();


// variables used in our sass tasks
const input = 'src/sass/**/*.scss';
const output = 'dist/css';

const jsInput = 'src/js/**/*.js';
const jsOutput = 'dist/js';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

// autoprefixer options
// this covers 90.87% of all browsers. run npx autoprefixer --info to see full report.
const autoprefixerOptions = {
  browsers: ['last 3 versions', '> 5%', 'Firefox ESR'],
  flexbox: 'true',
  grid: 'true'
};

//
// main gulp task
//
gulp.task('sass', () => {
  return gulp.src(input)
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output))
    .pipe(browserSync.reload({ stream : true }));
});

gulp.task('js', () => {
  return gulp.src(['./src/js/vendor/modernizr-custom.js', './src/js/plugins.js', './src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsOutput));
    
});

gulp.task('minify-html', () => {
  return gulp.src('./src/html/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
    .pipe(gulp.dest('./'));
});

// gulp.task('serve', function() {
//   browserSync.init({
//     server: {
//       baseDir: './'
//     },
//     //port : 5678
//     //proxy : 'http://192.168.1.155:5678'
//   });

//   browserSync.init({
//    // port : 5678
//    proxy: 'localhost:5678'
// });

//   gulp.watch('sass/**/*.scss', ['sass']);
//   gulp.watch('./**/*.html').on('change', browserSync.reload);
// });

gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['minify-html']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['minify-html', 'sass', 'js', 'watch']);