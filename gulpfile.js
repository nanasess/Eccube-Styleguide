const gulp = require("gulp");

global.watch = [];
global.build = [];

global.src = "./";
global.dest = "./public/";

require("./assets/gulp/pug.js")
require("./assets/gulp/sass.js")
// require("./frontend/gulp/webpack.js")
require("./assets/gulp/styleguide.js")
require("./assets/gulp/browserSync.js")

// Gulp 4 構文に対応
gulp.task("watch", gulp.parallel(global.watch))

gulp.task("build", gulp.series(...global.build))

gulp.task("default", gulp.series("watch"))
