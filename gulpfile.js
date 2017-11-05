var gulp = require("gulp"),
	sass = require("gulp-sass"),
	livereload = require("gulp-livereload");


// 任务：编译SASS
gulp.task("sass", function(){
	gulp.src(["sass/*.scss"])
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest("css"))
		.pipe(livereload());
});

// 任务：自动刷新
gulp.task("reload", function(){
	livereload.listen();
	gulp.watch("sass/*.scss", ["sass"]);
});

