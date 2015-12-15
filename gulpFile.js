
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
  	root: 'app'
  });
});

gulp.task('copy-html-files', function() {
	gulp.src(['./app/**/*.html', './app/index.html', './app/home.html'], {base: './app'})
	.pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
	gulp.src('./app/index.html')
		.pipe(usemin({
			css : [minifyCss(), 'concat', rev()],
			js : [uglify(), rev()]
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('build', ['copy-html-files', 'usemin']);