'use strict';
const gulp = require('gulp');

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

//const browserSync = require('browser-sync').create();

const del = require('del');

const critical = require('critical').stream;

// variables used in our sass tasks
const cssInput = 'src/sass/**/*.scss';
const cssOutput = 'dist/css';

// options for (S)CSS
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

const jsInput = 'src/js/**/*.js';
const jsOutput = 'dist/js';
// JS Sources in order:
const jsSources = {
  sources: [
    './src/js/vendor/modernizr-custom.js', 
    './src/js/plugins.js', 
    './src/js/main.js'
  ]
}

const criticalHTML = {
  in: './src/html/**/*.html',
  out: './src/chtml'
};

const htmlInput = './src/chtml/**/*.*html';
const htmlOutput = 'dist/';


// autoprefixer options
// this covers 90.87% of all browsers. run npx autoprefixer --info to see full report.
const autoprefixerOptions = {
  browsers: [
    'last 3 versions',
    '> 5%', 'Firefox ESR'
  ],
  flexbox: 'true',
  grid: 'true'
};

//
// main gulp tasks
//
gulp.task('sass', () => {
  return gulp.src(cssInput)
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssOutput));
    //.pipe(browserSync.reload({ stream : true }));
});

gulp.task('js', () => {
  return gulp.src(jsSources.sources)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsOutput));
    
});

// Generate & Inline Critical-path CSS
const criticalOptions = {
  base: criticalHTML.out,
  inline: true,
  css: 'dist/css/main.css',
  }

gulp.task('critical', () => {
  return gulp.src(criticalHTML.in)
      .pipe(critical(criticalOptions))
      .on('error', function(err) { log.error(err.message); })
      .pipe(gulp.dest(criticalHTML.out));
});

// Minify the whole thing _after_ Critical has done its work...
// options for HTML Minification
const htmlOptions = { 
  collapseWhitespace: true
}

gulp.task('minify-html', () => {
  return gulp.src(htmlInput)
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest(htmlOutput));
});

// run clean up operations:
// delete current occupants of the chtml (basically the "temp" folder. stands for "criticized HTML")

// .pipe(del(['./src/chtml/*'], { read: false }))

gulp.task('clean', () => {
  // return del(criticalHTML.out);
  return del(['./src/chtml/*'], { read: false });
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

// 
// Critical CSS inlining:
//
// TODO: this watch command DOES not work just yet.
//       so it should be fixed...
// 
// gulp.task('watch', () => {
//   gulp.watch(criticalHTML.in, ['critical']);
//   gulp.watch(htmlInput, ['minify-html']);
//   gulp.watch(cssInput, ['sass']);
//   gulp.watch(jsInput, ['js']);
// });

gulp.task('clean-it', ['clean']);

gulp.task('default', ['critical', 'sass', 'js', 'minify-html']);