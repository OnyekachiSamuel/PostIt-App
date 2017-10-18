import gulp from 'gulp';
import babel from 'gulp-babel';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import jasmine from 'gulp-jasmine';
import exit from 'gulp-exit';


gulp.task('run-test', () => {
  gulp.src(['server/spec/routesSpec.js'])
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmine())
    .pipe(exit());
});


gulp.task('client-test', () => {
  gulp.src(['client/tests/HomePage.test.js'])
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmine())
    .pipe(exit());
});


gulp.task('coverage', () => {
  gulp.src(['server/controllers/UserController.js',
    'server/controllers/GroupController.js',
    'server/controllers/MessageController.js',
    'server/models/*.js',
    'server/middlewares/Validator.js',
    'server/middlewares/EnsureToken.js'])
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
