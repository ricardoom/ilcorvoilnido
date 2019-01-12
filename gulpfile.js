const gulp = require('gulp');

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

// const uglify = require('gulp-uglify');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

const useref = require('gulp-useref');

const del = require('del');

const critical = require('critical').stream;

const log = require('fancy-log');

// Set up path object:

const paths = {
  styles: {
    source: 'src/sass/**/*.scss',
    development: 'dev/css',
    build: 'build/css',
  },
  scripts: {
    jsVendors: ['./src/js/vendor/fontfaceobserver.standalone.js'],
    source: [
      './src/js/vendor/modernizr-custom.js',
      './src/js/plugins.js',
      './src/js/main.js',
    ],
    development: ['dev/js', 'dev/js/vendor'],
    build: 'build/js',
  },
  markup: {
    source: 'src/**/*.html',
    development: 'dev/',
    build: 'dist/',
  },
  images: {
    source: 'img/**/*.*',
    development: 'img/',
    build: 'dist/img',
  },
};

//
// main gulp tasks
//

// SASS Tasks
// Path from  SASS files scss input -> compiled css output path
// const scssInput = 'src/sass/**/*.scss';
// const cssOutput = 'dist/css';

// CSS autoprefixer options
// this covers 90.87% of all browsers. run npx autoprefixer --info to see full report.
const autoprefixerOptions = {
  browsers: ['last 3 versions', '> 5%', 'Firefox ESR'],
  flexbox: 'true',
  grid: 'true',
};

// SASS options
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
};

// set up the SASS task:
gulp.task('sass', () =>
  gulp
    .src(paths.styles.source)
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.development)),
);

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
  gulp
    .src(paths.scripts.jsVendors)
    .pipe(gulp.dest(paths.scripts.development[1]));
});

gulp.task('js', ['vendorJS'], () =>
  gulp
    .src(paths.scripts.source)
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.development[0])),
);

gulp.task('html', () => {
  gulp.src(paths.markup.source).pipe(gulp.dest(paths.markup.development));
});

//
// Generate & Inline Critical-path CSS
// paths for critical operations:
// const criticalHTML = {
//   in: 'src/html/**/*.html',
//   out: 'src/chtml',
// };

const criticalOptions = {
  base: 'src/',
  inline: true,
  css: 'dist/css/main.css',
};

gulp.task('critical', () => {
  gulp
    .src(paths.markup.development)
    .pipe(critical(criticalOptions))
    .on('error', err => {
      log.error(err.message);
    })
    .pipe(gulp.dest(paths.markup.build));
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

gulp.task('minify-html', () =>
  gulp
    .src(chtmlInput)
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest(htmlOutput)),
);

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

gulp.task('clean', () => del(cleanDest.sources, { read: false }));

// utility tasks to clean the build folder & do final inlining etc...
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

gulp.task('build', ['critical', 'minify-html']);

gulp.task('default', () => {
  log(
    "We're overriding the default command here, so you have to be explicit about what you want to do",
  );
});
