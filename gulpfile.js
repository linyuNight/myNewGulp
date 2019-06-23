const gulp = require('gulp');
const sass = require('gulp-sass');
var connect = require('gulp-connect');
var spritesmith=require('gulp.spritesmith');

const Asset = {
	css:'src/**/*.scss',
	all:['client/**/*.*','!src/**/*.scss'],
	// sprite:'client/**/*.png'
}

gulp.task('sass',function(cb){
	gulp.src(Asset.css)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('client/css'))
		.pipe(connect.reload());
	cb();
})

// gulp.task('autoSprite', function (cb) {
//   gulp.src(Asset.sprite).pipe(spritesmith({
//     imgName: 'sprite.png',
//     cssName: 'sprite.css',
//     padding: 20 
//   })).pipe(gulp.dest('client/image'));
//   cb()
// });

gulp.task('all',function(cb){
	gulp.src(Asset.all)
		.pipe(connect.reload());
	cb();
})

gulp.task('connect',function(cb){
    connect.server({
        root:'client',//根目录
        // ip:'192.168.11.62',//默认localhost:8080
        livereload:true,//自动更新
        port:9999//端口
    })
    cb()//执行回调，表示这个异步任务已经完成，起通作用,这样会执行下个任务
})

gulp.task('watch',function(cb){
	gulp.watch(Asset.css, gulp.series('sass'));
    gulp.watch(Asset.all, gulp.series('all'));
    cb()//执行回调，表示这个异步任务已经完成，起通作用,这样会执行下个任务
})

gulp.task('default',gulp.series('sass','watch','connect'));

