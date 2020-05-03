"use strict";

var gulp = require("gulp"); //require подключаем gulp
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create(); //вызываем server

gulp.task("css", function () {
  return gulp.src("source/less/style.less") //найдет нужные файлы less
    .pipe(plumber()) //plumber отслеживает ошибки в препроцессорных файлах less
    .pipe(sourcemap.init()) //перед работтой с препроцессор. фиксируем состояние препроцесс кода init()
    .pipe(less())  //превращаем less в css код
    .pipe(postcss([   // в css добавляются
      autoprefixer()  // автопрефиксы
    ]))
    .pipe(csso()) //минификатор css
    .pipe(rename("style.min.css")) //переименование минифицированного файла
    .pipe(sourcemap.write(".")) //фиксируется итоговое состояние карты кода
    .pipe(gulp.dest("build/css")) //перемещаем файлы в папку css
    .pipe(server.stream());
});

gulp.task("images", function(){ //оптимизация изображений png, jpeg, svg
  return gulp.src("source/img/**/*.{png,jpg,svg}") //ищем на любой вложенности внитри /**/*
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}), //за один раз optipng будет просматривать 3 раза
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function(){ //задача создания изображений в webp формате
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"))
});

gulp.task("sprite", function(){ //задача создания из иконок спрайт
  return gulp.src("source/img/icon-*.svg")
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"))
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"))
});

gulp.task("copy", function() { //задача копирования всех не отпимизированных файлов
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source" //путь
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() { //задача удалить папку build
  return del("build");
});

gulp.task("server", function () { //создание задачи про сервер
  server.init({
    server: "build/", //server смотрит файлы в папке build
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css")); //указаваем серверу, смотреть watch за изменениями в файле и потом выполнить задачу gulp css
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh")); //как только измененится img запустится спрайт и изменится html
  gulp.watch("source/*.html", gulp.series("html", "refresh")); //указаваем серверу, смотреть за изменениями html и как изменится перезагрузить сервер
});

gulp.task("refresh", function(done) { //задача для перезагрузки страницы
  server.reload();
  done();
});

gulp.task("build", gulp.series( //задача для npm run build
  "clean",
  "copy",
  "css",
  "sprite",
  "html"
));
gulp.task("start", gulp.series("build", "server"));  //при команде npm start, запускается gulp start
//первая задача css, вторая server последовательно
