var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('makeMarkup', function(){
  var pugit = require('./lib/pugit');
  pugit('app/views/index.jade', {pretty:true}).pipe(gulp.dest('public'));
});

gulp.task('cook', function(){
  gulp.src('app/src/index.js')
    .pipe(rename('fractalview.js'))
    .pipe(gulp.dest('public/javascripts/'));
});

var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./src/*.js'])
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['makeMarkup', 'cook']);
