'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var livereload = require('gulp-livereload');
var http = require('http');
var st = require('st');

gulp.task('sass', function () {
  return gulp.src(['./src/stylesheets/*.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('watch', ['server'], function () {
  livereload.listen({ basePath: 'dist' });
  gulp.watch(['./src/stylesheets/*.scss', './src/stylesheets/**/*.scss'], ['sass']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/dist', index: 'index.html', cache: false })
  ).listen(8080, done);
});
