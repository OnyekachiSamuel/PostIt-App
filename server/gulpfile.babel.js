import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import istanbulReport from 'gulp-istanbul-report';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import jasmine from 'gulp-jasmine';
import exit from 'gulp-exit';
import mocha from 'gulp-mocha';
// import babel from 'babel-register';



gulp.task('transpile', () => {
  gulp.src(['models/*js', 'routes/index.js', 'spec/routesTestSpec.js', 'tests/*js', 'app.js', 'config.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/'));
});

// Run the tests
gulp.task('run-test', ['transpile'], () => {
  gulp.src(['dist/routesTestSpec.js'])
    .pipe(babel())
    .pipe(jasmine())
    .pipe(exit());
});





gulp.task('serve', () =>
  nodemon({
    script: 'app.js',
    ext: 'js html',
    env: { NODE_ENV: process.env.NODE_ENV }
  })
);

gulp.task('test-run', () => {
  gulp.src(['tests/*.js'])
    .pipe(mocha({
      compilers: babel({ presets: ['es2015'] })
    }));
});

// Generate the coverage report
gulp.task('test', () => {
  gulp.src('./coverage/coverage.json')
    .pipe(istanbulReport());
});


// Generate the coverage report
gulp.task('coverage', (cb) => {
  gulp.src(['models/*js', 'routes/index.js', 'app.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('tests/*.js')
        .pipe(babel())
        .pipe(injectModules())
        .pipe(mocha())
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

