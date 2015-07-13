var gulp = require('gulp');
var rename = require('gulp-rename');

var jade = require('gulp-jade');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var minifyCss = require('gulp-minify-css');

var shell = require('gulp-shell');
var livereload = require('gulp-livereload');

var paths = {
  jade: ['./jade/**/*.jade'],
  sass: ['./sass/**/*.scss'],
  js: ['./main.js']
}

gulp.task('jade', function() {
  gulp.src('./jade/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('sass', function(done) {
  var processors = [
    autoprefixer({browsers: ['last 2 version']})
  ];

  gulp.src('./sass/style.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./'))
    .on('end', done)
    .pipe(livereload());
});

gulp.task('server', shell.task([
    'python -m SimpleHTTPServer 8000'
]));

gulp.task('js', function() {
  livereload.reload();
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['watch', 'jade', 'sass', 'server']);
