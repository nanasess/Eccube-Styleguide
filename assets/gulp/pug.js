"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

const {src,dest,jade_option} = global;

gulp.task("pug", () => {
    let options = (jade_option) ? jade_option : {
        locals: {},
        pretty: true,
        basedir: process.cwd(),
        doctype: "html"
    };
    let srcPattern = [
        `${src}assets/tmpl/**/*.pug`,
        `!${src}assets/tmpl/**/_*`,
        `!${src}assets/tmpl/elements/**/*`,
    ];
    return gulp.src(srcPattern)
        .pipe($.plumber({
            errorHandler: $.notify.onError('<%= error.message %>')
        }))
        .pipe($.pug(options))
        .pipe(gulp.dest(`${dest}/`));
});

gulp.task("pug:watch", (done) => {
    let target = [
        `${src}assets/tmpl/**/*`,
    ];
    gulp.watch(target, gulp.series("pug", "server:reload"));
    done();
});

// global.watch.push("pug:watch")
global.build.push("pug");
