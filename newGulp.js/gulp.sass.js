//
// SASS & CSS
//

const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  markup: {
    src: 'src/**/*.html'
    dest: 'dist/'
  }
};

const autoprefixerOptions = {
  browsers: [
    'last 3 versions',
    '> 5%', 'Firefox ESR',
  ],
  flexbox: 'true',
  grid: 'true',
};

// Gulp SASS options
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
};

// set up the SASS task:
function sassCompile() {
gulp.task('sass', () => src(paths.styles.src)
  .pipe(sass())
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(dest(paths.styles.dest)));
}

// examples:
// function javascript(cb) {
//   // body omitted
//   cb();
// }

// function css(cb) {
//   // body omitted
//   cb();
// }

// function styles() {
//   return gulp.src(paths.styles.src)
//     .pipe(less())
//     .pipe(cleanCSS())
//     // pass in options to the stream
//     .pipe(rename({
//       basename: 'main',
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest(paths.styles.dest));
// }

exports.sassCompile = sass;