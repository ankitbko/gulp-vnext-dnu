var gulp = require('gulp');
var dnu = require('./src/dnu');

gulp.task('restore', dnu.restore({
  src:'tests/**/project.json',
  noCache: true
}))

gulp.task('dnu:restore', function () {
  return gulp.src('./tests/**/project.json', {read:false})
    .pipe(dnu('restore', {noCache: true}))
})

gulp.task('build', dnu.build({
  src:'tests/**/project.json'
}))

gulp.task('dnu:build', function () {
  return gulp.src('./tests/**/project.json', {read:false})
    .pipe(dnu('build'))
})

gulp.task('pack', dnu.pack({
  src:'tests/**/project.json',
  out: 'artefacts'
}))

gulp.task('dnu:pack', function () {
  return gulp.src('./tests/**/project.json', {read:false})
    .pipe(dnu('pack', {out:'artefacts'}))
})
