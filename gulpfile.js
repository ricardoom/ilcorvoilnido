'use strict';
const gulp = require('gulp');

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

// const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();

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
    './src/js/plugins.js', './src/js/main.js'
  ]
}

// const unCriticizedHTML = './src/html/**/*.html'
// const criticizedHTML = './src/chtml/';
const criticalHTML = {
  in: './src/html/**/*.html',
  out: './src/chtml/'
};

const criticalOptions = {
  base: criticalHTML.out,
  inline: true,
  css: 'dist/css/main.css',
  minify: false
  }


const htmlInput = './src/chtml/**/*.html';

const htmlOutput = 'dist/';
// options for HTML Minification
const htmlOptions = { 
  collapseWhitespace: true,
  //minifyCSS: true 
}



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
// main gulp task
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
gulp.task('critical', () => {
  return gulp.src(criticalHTML.in)
      .pipe(critical(criticalOptions))
      .on('error', function(err) { log.error(err.message); })
      .pipe(gulp.dest(htmlInput));
});

// Minify the whole thing _after_ Critical has done its work...
gulp.task('minify-html', () => {
  return gulp.src(htmlInput)
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest(htmlOutput));
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

// gulp.task('critical', function(cb) {
//   critical.generate({
//       inline: true,
//       base: 'dist/',
//       src: 'src/index.html',
//       css: ['dist/css/main.css'],
//       dest: 'index.html',
//       minify: true,
//       // width: 320,
//       // height: 480
//   });
// });


gulp.task('watch', () => {
  gulp.watch(criticalHTML.in, ['critical']);
  gulp.watch(htmlInput, ['minify-html']);
  gulp.watch(cssInput, ['sass']);
  gulp.watch(jsInput, ['js']);
});

gulp.task('default', ['critical', 'minify-html', 'sass', 'js']);