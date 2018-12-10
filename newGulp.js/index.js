const { src, dest } = require('gulp');

// const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');

const htmlmin = require('gulp-htmlmin');

const del = require('del');

const critical = require('critical').stream;

const log = require('fancy-log');


//
// Paths
//

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

// Importing as a module now, see gulp.sass.js:



// //
// // SASS & CSS
// //

// const autoprefixerOptions = {
//   browsers: [
//     'last 3 versions',
//     '> 5%', 'Firefox ESR',
//   ],
//   flexbox: 'true',
//   grid: 'true',
// };

// // Gulp SASS options
// const sassOptions = {
//   errLogToConsole: true,
//   outputStyle: 'compressed',
// };

// // set up the SASS task:
// gulp.task('sass', () => src(scssInput)
//   .pipe(sass())
//   .pipe(autoprefixer(autoprefixerOptions))
//   .pipe(sourcemaps.init())
//   .pipe(sass(sassOptions).on('error', sass.logError))
//   .pipe(sourcemaps.write('./'))
//   .pipe(dest(cssOutput)));

//
// Find and concact all the JS into a single file:
// JS Sources _must_ be in order of execution
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

// Do image processing / or svg operations...

// set up a dev / design commands and watch tasks
//  needs to watch sass (compile to css),
//   JS watch and compile,
//   HTML watch for changes,

 // Set up built to dist and commit tasks, should have linting 
 // needs to minifiy 
 // CSS & do the critical task
 // needs to minify the JS
 // needs to minify the HTML
 // deletes or overwrites code from /dist folder but only that which has changed 