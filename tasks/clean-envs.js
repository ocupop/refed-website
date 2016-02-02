var gulp = require("gulp"),
    del = require("del");

//
// Deletes the directory that is used to serve the site during development
gulp.task("clean:dev", del.bind(null, ["serve"]));


//
// Deletes the directory that the optimized site is output to
gulp.task("clean:prod", del.bind(null, ["site"]));