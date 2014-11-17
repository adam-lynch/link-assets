link-assets
==========

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url] 

---

## Installation

```javascript
npm install link-assets
```

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
<td>bustCache</td><td>false</td><td>A time-based query string will be appended</td>
</tr>
<tr>
<td>docRoot</td><td>None</td><td>Path to document root so only relative paths to assets are written out. If none is passed, just the filenames are output.</td>
</tr>
<tr>
<td>lineBreaks</td><td>false</td><td>Splits asset references onto separate lines</td>
</tr>
<tr>
<td>selfCloseEmptyElements</td><td>false</td><td>Puts closing slash on empty elements</td>
</tr>
<tr>
</table>

### Notes
- Forward slashes are always used no matter which platform.


[npm-url]: https://npmjs.org/package/link-assets
[npm-image]: http://img.shields.io/npm/v/link-assets.svg?style=flat

[travis-url]: http://travis-ci.org/adam-lynch/link-assets
[travis-image]: http://img.shields.io/travis/adam-lynch/link-assets.svg?style=flat

[appveyor-url]: https://ci.appveyor.com/project/adam-lynch/link-assets/branch/master
[appveyor-image]: https://ci.appveyor.com/api/projects/status/0pqag2cjjqa5h23w/branch/master?svg=true

[depstat-url]: https://david-dm.org/adam-lynch/link-assets
[depstat-image]: https://david-dm.org/adam-lynch/link-assets.svg?style=flat
