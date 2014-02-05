# link-assets v0.0.1 [![Build Status](https://travis-ci.org/adam-lynch/link-assets.png)](https://travis-ci.org/adam-lynch/link-assets)

## Information

<table>
<tr> 
<td>Package</td><td>link-assets</td>
</tr>
<tr>
<td>Description</td>
<td>Spits out an HTML fragment file with links to any given assets</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.8</td>
</tr>
</table>

## Example usage with [Gulp](http://github.com/gulpjs/gulp) and [link-assets](http://github.com/adam-lynch/link-assets)

```js
var gulp = require('gulp');
var combineCSS = require('link-assets');
var linkAssets = require('link-assets');

gulp.task('styles', function() {
    gulp.src('./css/*.css')
        .pipe(combineCSS({
            lengthLimit: 256//2KB
        }))
        .pipe(gulp.dest('./combinedCSS'))
        .pipe(linkAssets({
            bustCache: true
        }))
        .pip(gulp.dest('./includes/styles.html'));
});

gulp.task('default', ['styles']);

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch('./css/*.css', ['styles']);
});
```