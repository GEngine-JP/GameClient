const gulp = require('gulp');
const webpack = require('webpack-stream');
const server = require('./test/server');
const watch = require('gulp-watch');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
var config = require('./webpack.config.test');

function test() {
  var stream = mochaPhantomJS();
  stream.write({path: 'http://localhost:8080/test.html'});
  stream.end();
  return stream;
}

gulp.task('test', () => {
  gulp.src('./').pipe(webpack(config)).pipe(gulp.dest('test/static'));

  watch('test/server.js', () => {
    server.close();
    server.start();
    test();
  });

  watch('test/static/index.js', () => {
    test();
  });

  server.start();
});

