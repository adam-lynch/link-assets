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

## linkAssets(fileName, options)

<table>
<tr>
<th>Property</th><th>Default</th><th>Description</th>
</tr>
<tr>
<td>docRoot</td><td>None</td><td>Path to document root so only relative paths to assets are written out</td>
</tr>
<tr>
<td>lineBreaks</td><td>false</td><td>Splits asset references onto separate lines</td>
</tr>
<tr>
<td>selfCloseEmptyElements</td><td>false</td><td>Puts closing slash on empty elements</td>
</tr>
<tr>
</table>