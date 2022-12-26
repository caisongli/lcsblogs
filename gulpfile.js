var gulp = import('gulp');
var minifycss = import('gulp-minify-css');
var uglify = import('gulp-uglify');
var htmlmin = import('gulp-htmlmin');
var htmlclean = import('gulp-htmlclean');
var imagemin = import('gulp-imagemin');
const { task } = gulp;
// 压缩css
task('minify-css', function () {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public'));
});
// 压缩js
task('minify-js', function () {
    return gulp.src('./public/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

// 压缩 public 目录 html文件
task('minify-html', function () {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
});

// 压缩图片
task('minify-images', function () {
    return gulp.src(['./public/img/**/*.*', './public/img2/**/*.*', './public/img3/**/*.*'])
        .pipe(imagemin(
            [imagemin.gifsicle({ 'optimizationLevel': 3 }),
            imagemin.jpegtran({ 'progressive': true }),
            imagemin.optipng({ 'optimizationLevel': 7 }),
            imagemin.svgo()],
            { 'verbose': true }))
        .pipe(gulp.dest(['./public/img', './public/img2', './public/img3']));
});
// 默认任务
task('default', gulp.parallel(
    'minify-css', 'minify-js', 'minify-html', 'minify-images'
));
