const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


const cssDest = 'style';
const cssInputFile = 'source/style.scss';
const watchedFile = 'source/**/*.scss';

gulp.task('buildcss', function () {
    return gulp.src(cssInputFile)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function () {
    gulp.watch(watchedFile, gulp.series('buildcss'));
});