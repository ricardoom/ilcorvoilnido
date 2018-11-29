const gulp = require('gulp');

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

const del = require('del');

const critical = require('critical').stream;

const log = require('fancy-log');
//
// main gulp tasks
//

// SASS Tasks
// Path from  SASS files scss input -> compiled css output path
const scssInput = 'src/sass/**/*.scss';
const cssOutput = 'dist/css';

// CSS autoprefixer options
// this covers 90.87% of all browsers. run npx autoprefixer --info to see full report.
const autoprefixerOptions = {
  browsers: [
    'last 3 versions',
    '> 5%', 'Firefox ESR',
  ],
  flexbox: 'true',
  grid: 'true',
};

// SASS options
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
};

// set up the SASS task:
gulp.task('sass', () => gulp.src(scssInput)
  .pipe(sass())
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(cssOutput)));

// end SASS works

//
// Find and concact all the JS into a single file:
//

// JS Sources in _must_ be in order of execution
const jsOutput = 'dist/js';
const jsSources = {
  sources: [
    './src/js/vendor/modernizr-custom.js',
    './src/js/plugins.js',
    './src/js/main.js',
  ],
};
gulp.task('js', () => gulp.src(jsSources.sources)
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(jsOutput)));


//
// Generate & Inline Critical-path CSS
// paths for critical operations:
const criticalHTML = {
  in: 'src/html/**/*.html',
  out: 'src/chtml',
};

const criticalOptions = {
  base: 'src/',
  inline: true,
  css: 'dist/css/main.css',
};

gulp.task('critical', () => {
  gulp.src(criticalHTML.in)
    .pipe(critical(criticalOptions))
    .on('error', (err) => { log.error(err.message); })
    .pipe(gulp.dest(criticalHTML.out));
});

// end critical task

//
// Minify the whole thing _after_ Critical has done its work...
// paths for HTML Minification
const chtmlInput = 'src/chtml/**/*.*html';
const htmlOutput = 'dist/';

// minify html options:
const htmlOptions = {
  collapseWhitespace: true,
};

gulp.task('minify-html', () => gulp.src(chtmlInput)
  .pipe(htmlmin(htmlOptions))
  .pipe(gulp.dest(htmlOutput)));

// end minifications

// run clean up operations:
// delete current occupants of the chtml (basically the "temp" folder. stands for "criticized HTML")

const cleanDest = {
  sources: [
    'src/chtml/**/*',
    'dist/index.html',
    'dist/404.html',
    'dist/css',
    'dist/js/*.js',
    'dist/about',
    '!dist/js/vendor',
  ],
};

gulp.task('clean', () => del(cleanDest.sources, { read: false }));

// Set up a watch command:
// TODO: this watch command DOES not work just yet.
//
//
// gulp.task('watch', () => {
//   gulp.watch(criticalHTML.in, ['critical']);
//   gulp.watch(htmlInput, ['minify-html']);
//   gulp.watch(cssInput, ['sass']);
//   gulp.watch(jsInput, ['js']);
// });

gulp.task('clean-it', ['clean']);
gulp.task('crit', ['critical']);

gulp.task('default', ['sass', 'js', 'critical', 'minify-html']);
