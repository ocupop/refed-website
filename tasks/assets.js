var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    // BrowserSync isn't a gulp package, and needs to be loaded manually
    browserSync = require('browser-sync'),
    // Need a command for reloading webpages using BrowserSync
    reload = browserSync.reload;
    // Main Bower Files isn't a gulp package, and needs to be loaded manually
    // mainBowerFiles = require('main-bower-files');


//
// loads bower dependencies into lib
// gulp.task('bower', function () {
//   var bowerFiles = mainBowerFiles({
//         debugging: true,
//         includeDev: true,
//         paths: {
//           bowerDirectory: 'src/_bower_components',
//           bowerrc: './.bowerrc',
//           bowerJson: './bower.json'
//         }
//       });
//   return gulp.src(bowerFiles)
//     .pipe(gulp.dest('src/assets/libs'));
// });



//
// Optimizes the images that exists
gulp.task('images', function () {
  return gulp.src('src/assets/images/**')
    .pipe($.changed('site/assets/images'))
    .pipe($.imagemin({
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true
    }))
    .pipe(gulp.dest('site/assets/images'))
    .pipe($.size({title: 'images'}));
});


//
// Compiles the SASS files and moves them into the 'assets/stylesheets' directory
gulp.task('styles', function () {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src('src/assets/scss/style.scss')
    .pipe($.sass())
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer('last 1 version', { cascade: true }))
    // Directory your CSS file goes to
    .pipe(gulp.dest('src/assets/stylesheets/'))
    .pipe(gulp.dest('publish/assets/stylesheets/'))
    // Outputs the size of the CSS file
    .pipe($.size({title: 'styles'}))
    // Injects the CSS changes to your browser since Jekyll doesn't rebuild the CSS
    .pipe(reload({stream: true}));
});


//
// Optimizes all the CSS, HTML and concats the JS etc
gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: 'serve'});

  return gulp.src('serve/**/*.html')
    .pipe(assets)
    // Concatenate JavaScript files and preserve important comments
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Minify CSS
    .pipe($.if('*.css', $.minifyCss()))
    // Start cache busting the files
    .pipe($.revAll({ ignore: ['.eot', '.svg', '.ttf', '.woff'] }))
    .pipe(assets.restore())
    // Conctenate your files based on what you specified in _layout/header.html
    .pipe($.useref())
    // Replace the asset names with their cache busted names
    .pipe($.revReplace())
    // Minify HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    // Send the output to the correct folder
    .pipe(gulp.dest('site'))
    .pipe($.size({title: 'optimizations'}));
});



// Run JS Lint against your JS
gulp.task('jslint', function () {
  gulp.src('./serve/assets/javascript/*.js')
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter());
});