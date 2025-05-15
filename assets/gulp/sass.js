"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(sassCompiler);

const {src,dest,scss_option} = global;

gulp.task("sass", ()=> {
    let options = (scss_option) ? scss_option : {
        sourceMap: true,
    };

    let srcPattern = [
        `${src}assets/scss/**/*.scss`
    ];

    return gulp.src(srcPattern)
        .pipe($.plumber({
            errorHandler: $.notify.onError('<%= error.message %>')
        }))
        .pipe($.sourcemaps.init())
        .pipe(sass(options).on('error', sass.logError))
        .pipe($.pleeease({
            autoprefixer: true,
            minifier: true,
            mqpacker: true
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(`${dest}assets/css/`));
});

gulp.task("sass:watch", (done) => {
    let target = [
        `${src}assets/scss/**/*.scss`,
    ];
    gulp.watch(target, gulp.series("sass"));
    done();
});

global.watch.push("sass:watch");
global.build.push("sass");
