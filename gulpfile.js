"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var posthtml = require("gulp-posthtml");
var del = require("del");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream())
    .pipe(gulp.dest("public/css"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("public"));
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("clean", function () {
  return del("public");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/**",
    "source/img/**",
    "source/js/**",
    "source/css/**",
    "source/*.html"
  ], {
    base: "source"
  })
.pipe(gulp.dest("public"));
});

gulp.task("build", gulp.series("clean", "copy", "css"));
gulp.task("start", gulp.series("css", "server"));
