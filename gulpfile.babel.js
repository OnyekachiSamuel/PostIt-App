import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import istanbulReport from 'gulp-istanbul-report';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import jasmine from 'gulp-jasmine';
import cover from 'gulp-coverage';
import exit from 'gulp-exit';




gulp.task('transpile', () => {
  gulp.src(['server/models/*js', 'server/routes/index.js', 'server/controllers/controller.js', 'server/spec/*.js', 'server/tests/*js', 'server/app.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/'));
});

// Run the tests
gulp.task('run-test', ['transpile'], () => {
  gulp.src(['dist/modelsTestSpec.js'])
    .pipe(babel())
    .pipe(jasmine())
    .pipe(exit());
});

// Generate the coverage report
gulp.task('test', () => {
  gulp.src('./coverage/coverage.json')
    .pipe(istanbulReport());
});

gulp.task('serve', ['transpile'], () =>
  nodemon({
    script: 'dist/app.js',
    ext: 'js html',
    env: { NODE_ENV: process.env.NODE_ENV }
  })
);

// Generate the coverage report
gulp.task('coverage', (cb) => {
  gulp.src(['server/routes/index.js', 'server/app.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('server/spec/routesTestSpec.js')
        .pipe(babel())
        .pipe(injectModules())
        .pipe(jasmine())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 30 } }))
        .on('end', cb);
    });
});


// Load code coverage to coveralls
gulp.task('coveralls', ['coverage'], () => {
  // If not running on CI environment it won't send lcov.info to coveralls
  if (!process.env.CI) {
    return;
  }

  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});


gulp.task('default', ['transpile', 'run-test', 'coveralls', 'test', 'coverage']);
