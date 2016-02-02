var gulp = require("gulp"),
    // BrowserSync isn't a gulp package, and needs to be loaded manually
    browserSync = require("browser-sync"),
    // Need a command for reloading webpages using BrowserSync
    reload = browserSync.reload,
    // And define a variable that BrowserSync uses in it's function
    bs;



// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task("serve:dev", ["styles", "jekyll:dev"], function () {
  bs = browserSync({
    notify: true,
    open: false,
    port: 4000,
    server: {
      baseDir: "publish"
    }
  });
});


//
// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task("watch", function () {
  gulp.watch(["src/**/*.md", "src/**/*.html", "src/**/*.xml", "src/**/*.txt", "src/**/*.js", "src/_data/*"], ["jekyll-rebuild"]);
  gulp.watch(["serve/assets/stylesheets/*.css"], reload);
  gulp.watch(["src/assets/scss/**/*.scss"], ["styles"]);
});


//
// Serve the site after optimizations to see that everything looks fine
gulp.task("serve:prod", function () {
  bs = browserSync({
    notify: false,
    // tunnel: true,
    server: {
      baseDir: "site"
    }
  });
});