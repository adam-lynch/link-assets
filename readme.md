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

## Example usage with [Gulp](http://github.com/gulpjs/gulp)

```js
var gulp = require('gulp');
var linkAssets = require('./');

gulp.task('include', function () {
    gulp.src('./css/*.css')
        .pipe(linkAssets('styles.html'))
        .pipe(gulp.dest('./includes/'));
});

gulp.task('default', ['include']);
```