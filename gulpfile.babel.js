import gulp from 'gulp';
import babel from 'gulp-babel';
// import nodemon from 'gulp-nodemon';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import jasmine from 'gulp-jasmine';
// import cover from 'gulp-coverage';
import exit from 'gulp-exit';

// Run the tests
gulp.task('run-test', () => {
  gulp.src(['server/spec/routesSpec.js'])
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmine())
    .pipe(exit());
});

// Generate the coverage report
gulp.task('coverage', () => {
  gulp.src(['server/controllers/controller.js', 'server/routes/index.js', 'server/app.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(['server/spec/*.js'])
        .pipe(babel())
        .pipe(injectModules())
        .pipe(jasmine())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 20 } }))
        .on('end', () => {
          gulp.src('coverage/lcov.info')
        .pipe(coveralls())
        .pipe(exit());
        });
    });
});

// Load code coverage to coveralls
/* gulp.task('coveralls', ['coverage'], () => {
  // If not running on CI environment it won't send lcov.info to coveralls
  if (!process.env.CI) {
    return;
  }
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});*/


gulp.task('default', ['coverage']);
