var gulp = require('gulp');
var linkAssets = require('./');

gulp.task('include', function () {
    gulp.src('./css/*.css')
        .pipe(linkAssets({
            fileName: 'include.html'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['include']);