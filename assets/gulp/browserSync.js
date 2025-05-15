"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

const browserSync = require("browser-sync");

const {src,dest} = global;

const fs = require("fs");
const path = require("path");
const pug = require("pug");

const pugMiddleWare = (req, res, next) => {
    const basedir = process.cwd();
    const requestPath = getPugTemplatePath(basedir, req);

    if (
        !requestPath ||
        path.parse(requestPath).ext !== ".html"
    ) {
        return next();
    }
    const pugPath = requestPath.replace('.html', '.pug');

    try {
        console.log("[BS] try to file "+ pugPath);
        fs.statSync(pugPath);
        const content = pug.renderFile(pugPath, {
            locals:{},
            pretty: true,
            basedir,
            compileDebug: true,
            doctype: "html"
        });
        res.end(Buffer.from(content));
    } catch (e) {
        console.log(e);
        return next();
    }
}

const getPugTemplatePath = (baseDir, req) => {
    // url.parse is deprecated in newer Node versions, use new URL() instead for Node 22
    const parsedUrl = new URL(req.url, 'http://localhost');
    const requestPath = parsedUrl.pathname;
    
    if (requestPath.substr(0, 4) !== "/moc") {
        return null;
    }
    const suffix = path.parse(requestPath).ext ? "": "index.html";
    return path.join(baseDir, "assets/tmpl", requestPath, suffix);
}

gulp.task("server", (done) => {
    browserSync({
        server: {
            middleware: [pugMiddleWare],
            baseDir: "public",
            index: "index.html",
        },
        open: "external",
    });
    
    gulp.watch([
        `${dest}/**/*`,
        `${src}/assets/tmpl/**/*`
    ], (done) => {
        setTimeout(function() {
            browserSync.reload();
            done();
        }, 500);
    });
    done();
});

gulp.task("server:reload", (done) => {
    browserSync.reload();
    done();
});

global.watch.push("server");
