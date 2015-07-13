# gulp-vnext-dnu

## Commands
- restore - Restore packages
- build - Produce assemblies
- pack - Build NuGet packages

## Install
```
npm install gulp-vnext-dnu --save-dev
```
## Usage
gulpfile.js
```js
var gulp = require('gulp');
var dnu = require('gulp-vnext-dnu');

gulp.task('restore', dnu.restore({
  src:'src/**/project.json',
  noCache: true,
  parallel: true
}))

// or

gulp.task('dnu:restore', function () {
  return gulp
    .src('./src/**/project.json', {read:false})
    .pipe(dnu('restore', {noCache: true}))
})
```
## Options - restore command
```
{
  noCache: false,
  parallel: false
}
```
## Options - build command
```
{
  configuration: 'Release|Debug'
}
```
## Options - pack command
```
{
  configuration: 'Release|Debug',
  out: 'path_for_nuget_packages'
}
```
