var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

// Styles task

gulp.task("styles", function(){
	return gulp.src("styles/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(concat("style.css"))
		.pipe(autoprefixer("last 2 versions", "ie8"))
		.pipe(gulp.dest("styles/"))
		.pipe(reload({ stream: true }));
});


//JS Hint Task

gulp.task("js", function() {
	return gulp.src("scripts/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(reload({ stream: true }));
});


//Browser Sync 

gulp.task("bstask", function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	})
});


// Watch Task 

gulp.task("watch", function() {
	gulp.watch("styles/*.scss", ["styles"]);
	gulp.watch("scripts/*.js", ["js"]);
	gulp.watch("*.html", reload);
});


gulp.task("default", ["bstask", "styles", "js", "watch"]);