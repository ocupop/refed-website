"use strict";

//
var gulp = require("gulp"),
    requireDir = require('require-dir'),
    tasks = requireDir('./tasks');

//
// Default task, run when just writing "gulp" in the terminal
gulp.task("default", ["serve:dev", "watch"]);
