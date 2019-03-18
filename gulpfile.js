const gulp = require('gulp');

const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

// const cssnano = require('gulp-cssnano');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

// const del = require('del');

const critical = require('critical');

// const log = require('fancy-log');

// const changed = require('gulp-changed');

const babel = require('gulp-babel');

const tasks = require('gulp-task-listing');

const uglify = require('gulp-uglify');

const babelOptions = {
  presets: ['@babel/env'],
};

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
    build: ['build/js', 'build/js/vendor'],
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
//
// Send the html file to the dev folder
//
// gulp.task('html', () => gulp.src(paths.markup.source).pipe(gulp.dest(paths.markup.development)));

//
// Minify the whole thing _after_ Critical has done its work...
// minify html options:
//
const htmlOptions = {
  collapseWhitespace: true,
  minifyJS: true,
};

gulp.task('html', () => gulp
  .src(paths.markup.source)
  .pipe(htmlmin(htmlOptions))
  .pipe(gulp.dest(paths.markup.development))
  .pipe(gulp.dest(paths.markup.build)));

// SASS Tasks
// CSS autoprefixer options
// this covers 90.87% of all browsers. run npx autoprefixer --info to see full report.

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
  outputStyle: 'compressed',
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

//
// Find and concact all the JS into a single file:
// JS Sources in _must_ be in order of execution
// see paths object above

gulp.task('vendorJS', () => {
  gulp
    .src(paths.scripts.jsVendors)
    .pipe(gulp.dest(paths.scripts.development[1]))
    .pipe(gulp.dest(paths.scripts.build[1]));
});

// // gulp Babel, so the JS can be uglified:
// gulp.task('babel', () => {
//   gulp
//     .src(paths.scripts.source)
//     .pipe(babel(babelOptions))
//     .pipe(gulp.dest(paths.scripts.development[0]));
// });

gulp.task('js', ['vendorJS'], () => gulp
  .src(paths.scripts.source)
  .pipe(sourcemaps.init())
  .pipe(babel(babelOptions))
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(paths.scripts.development[0]))
  .pipe(gulp.dest(paths.scripts.build[0])));

//
// CSS Nano ~ minify the CSS
//
// gulp.task('cssnano', () =>
//   gulp
//     .src('dev/css/main.css')
//     .pipe(sourcemaps.init())
//     .pipe(cssnano())
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./build/css')),
// );

//
// Generate & Inline Critical-path CSS
//

// gulp.task('critical', () => gulp
//   .src('dist/*.html')
//   .pipe(
//     critical({
//       base: 'dist/',
//       inline: true,
//       css: ['dist/styles/components.css', 'dist/styles/main.css'],
//     }),
//   )
//   .on('error', (err) => {
//     log.error(err.message);
//   })
//   .pipe(gulp.dest('dist')));

// gulp.task('critical', () =>  gulp.src('build/**/*.html').pipe(critical)
// );

gulp.task('critical', ['sass'], (cb) => {
  critical.generate({
    inline: true,
    base: 'build/',
    src: 'index.html',
    dest: 'index-critical.html',
    dimensions: [
      {
        width: 414,
        height: 736,
      },
    ],
    minify: true,
  });
});
// /critical task

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
gulp.task('build', ['critical', 'minify']);

//
// override the default `gulp` command and send a list of all the available commands
//
gulp.task('help', tasks);
gulp.task('default', ['help']);
