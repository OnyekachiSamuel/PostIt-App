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

// Run client-side test
gulp.task('client-test', () => {
  gulp.src(['client/tests/HomePage.test.js'])
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmine())
    .pipe(exit());
});

// Generate the coverage report
gulp.task('coverage', () => {
  gulp.src(['server/controllers/userController.js',
    'server/controllers/groupController.js',
    'server/controllers/messageController.js',
    'server/controllers/helper/getUsersPhoneEmail.js',
    'server/models/*.js',
    'server/middlewares/validator.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(['server/spec/routeSpec.js'])
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


gulp.task('default', ['coverage']);
