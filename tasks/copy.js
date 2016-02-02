var gulp = require("gulp"),
    $ = require("gulp-load-plugins")();
//
// Copy xml and txt files to the "site" directory
// gulp.task("copy", function () {
//   return gulp.src(["serve/*.txt", "serve/*.xml"])
//     .pipe(gulp.dest("site"))
//     .pipe($.size({ title: "xml & txt" }))
// });