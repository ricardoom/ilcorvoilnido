const gulp = require('gulp');

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

const cssnano = require('gulp-cssnano');

// const uglify = require('gulp-uglify');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

const del = require('del');

const critical = require('critical');

// const log = require('fancy-log');

const tasks = require('gulp-task-listing');
// Set up path object:

// const path = {
//   source: {
//     styles: 'src/styles/**/*.scss',
//     scripts: {},
//     markup: {},
//     images: {},
//   },
//   development: {
//     styles: 'dev/css',
//     scripts: {},
//     markup: {},
//     images: {},
//   },
//   build: {
//     styles: 'build/css/',
//     scripts: {},
//     markup: {},
//     images: {},
//   },
// };

const paths = {
  styles: {
    source: 'src/styles/**/*.scss',
    development: 'dev/css',
    build: 'build/css/',
  },
  scripts: {
    jsVendors: ['./src/js/vendor/fontfaceobserver.standalone.js'],
    source: ['./src/js/vendor/modernizr-custom.js', './src/js/plugins.js', './src/js/main.js'],
    development: ['dev/js', 'dev/js/vendor'],
    build: 'build/js',
  },
  markup: {
    source: 'src/**/*.html',
    development: 'dev/',
    build: 'build/',
  },
  images: {
    source: 'img/**/*.*',
    development: 'img/',
    build: 'build/img',
  },
};

//
// main gulp tasks
//

// SASS Tasks
// CSS autoprefixer options
// this covers 90.87% of all browsers. run npx autoprefixer --info to see full report.
//
// sass compiler: we use node-sass b/c we're a gultton for node-sass punishment...
//
sass.compiler = require('node-sass');

//
// Autoprefixer options:
//
const autoprefixerOptions = {
  browsers: ['last 3 versions', '> 5%', 'Firefox ESR'],
  flexbox: 'true',
  grid: 'true',
};

// SASS options
// see: https://github.com/sass/node-sass#outputstyle
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
};

// set up the SASS task:
gulp.task('sass', () => gulp
  .src(paths.styles.source)
  .pipe(sass())
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(paths.styles.development)));

// end SASS works

//
// Find and concact all the JS into a single file:
// JS Sources in _must_ be in order of execution
// see paths object above

// const jsOutput = 'dist/js';
// const jsSources = {
//   sources: [
//     './src/js/vendor/modernizr-custom.js',
//     './src/js/plugins.js',
//     './src/js/main.js',
//   ],
// };

gulp.task('vendorJS', () => {
  gulp.src(paths.scripts.jsVendors).pipe(gulp.dest(paths.scripts.development[1]));
});

gulp.task('js', ['vendorJS'], () => gulp
  .src(paths.scripts.source)
  .pipe(sourcemaps.init())
// .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(paths.scripts.development[0])));

gulp.task('html', () => {
  gulp
    .src(paths.markup.source)
    .pipe(gulp.dest(paths.markup.development))
    .pipe(gulp.dest(paths.markup.build));
});

//
// Generate & Inline Critical-path CSS

gulp.task('critical', () => {
  critical.generate({
    inline: true,
    base: paths.markup.build,
    src: '../dev/index.html',
    dest: 'index.html',
    dimensions: [
      {
        width: 414,
        height: 896,
      },
    ],
    minify: true,
  });
});
// /critical task

//
// CSS Nano
// Minify the CSS
//
gulp.task('cssnano', () => gulp
  .src('dev/css/main.css')
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.styles.build)));

//
// Minify the whole thing _after_ Critical has done its work...
// paths for HTML Minification
// const chtmlInput = 'src/chtml/**/*.*html';
// const htmlOutput = 'dist/';

// minify html options:
const htmlOptions = {
  collapseWhitespace: true,
};

gulp.task('minify-html', () => gulp
  .src(chtmlInput)
  .pipe(htmlmin(htmlOptions))
  .pipe(gulp.dest(htmlOutput)));

// end minifications

// run clean up operations:
// delete current occupants of the chtml (basically the "temp" folder. stands for "criticized HTML")

// const cleanDest = {
//   sources: [
//     'src/chtml/**/*',
//     'dist/index.html',
//     'dist/404.html',
//     'dist/css',
//     'dist/js/*.js',
//     'dist/about',
//     '!dist/js/vendor',
//   ],
// };

//
// utility tasks to clean the build folder & do final inlining etc...
//
// gulp.task('clean', () => del(cleanDest.sources, { read: false }));
gulp.task('clean-it', ['clean']);
gulp.task('crit', ['critical']);

//
// Set up a watch command for development:
//

gulp.task('watch', ['html', 'sass', 'js'], () => {
  gulp.watch(paths.markup.source, ['html']);
  gulp.watch(paths.styles.source, ['sass']);
  gulp.watch(paths.scripts.source, ['js']);
});

//
// Build
// everything into build folder to be deployed
//
gulp.task('build', ['critical', 'minify-html']);

//
// override the default `gulp` command and send a list of all the available commands
//
gulp.task('help', tasks);
gulp.task('default', ['help']);
