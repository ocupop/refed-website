var gulp = require("gulp"),
    // BrowserSync isn't a gulp package, and needs to be loaded manually
    browserSync = require("browser-sync"),
    // Need a command for reloading webpages using BrowserSync
    reload = browserSync.reload,
    $ = require("gulp-load-plugins")();

//
// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task("jekyll:dev", $.shell.task("jekyll build"));

gulp.task("jekyll-rebuild", ["jekyll:dev"], function () {
  reload;
});


//
// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don't end up publishing your drafts or future posts
gulp.task("jekyll:prod", $.shell.task("jekyll build --config _config.yml,_config.build.yml"));

// Runs "jekyll doctor" on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task("doctor", $.shell.task("jekyll doctor"));