'use strict'

// include gulp
var gulp = require('gulp');

// include plugins
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'run-sequence', 'imagemin-pngquant'],
  replaceString: /\bgulp[\-.]/
});

// default configuration
var config = {
    destination: 'public/',
     sassPath: 'src/scss',
     bowerDir: 'src/components' 
}

// connect server
gulp.task('connect', function() {
  plugins.connect.server({ root: config.destination, port: 4000, livereload: true });
});

// kit
gulp.task('kit', function(){
    return gulp.src('src/kit/*.kit')
    .pipe(plugins.kit())
    .pipe(gulp.dest(config.destination))

    // reload connect server
    .pipe(plugins.connect.reload());
});

// // html
// gulp.task('html', function () {
//   gulp.src('src/html/*.html')
//     // minify html
//     .pipe(plugins.minifyHtml())
//     .on('error', errorHandler)
//     // destination
//     .pipe(gulp.dest(dest))
//     // reload connect server
//     .pipe(plugins.connect.reload());
// });



// scss
gulp.task('scss', function () {
  gulp.src(['src/scss/*.scss', 'src/scss/**/*.scss'])

    // source mapping
    .pipe(plugins.sourcemaps.init())

      // sass
      .pipe(plugins.sass({
        style: 'compact',
        includePaths: [
          // config.sassPath,
          //  config.bowerDir + '/bootstrap-sass/assets/stylesheets/',
          //  config.bowerDir + '/fontawesome/scss/'
        ]
      }))
      .on('error', errorHandler)
      // autoprefixer
      .pipe(plugins.autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))

    // source mapping
    .pipe(plugins.sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: config.sassPath
    }))

    .pipe(gulp.dest(config.destination +'css'))

    // rename to min
    .pipe(plugins.rename({suffix: '.min'}))
    // minify css
    .pipe(plugins.minifyCss({
      compatibility: 'ie8'
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest(config.destination +'css'))
    // reload connect server
    .pipe(plugins.connect.reload());
});

// vendor
gulp.task('vendor', function() { 
  gulp.src('src/js/vendor/*.js') 
      .pipe(gulp.dest(config.destination + 'js/vendor')); 
  gulp.src('src/css/*.css') 
      .pipe(gulp.dest(config.destination + 'css/vendor')); 
});

// javascript
gulp.task('js', function() {
  // ordered javascript
  var jsFiles = [
    'src/js/main.js',
    'src/js/plugins.js'
  ]

  gulp.src(jsFiles)

    // source mapping
    .pipe(plugins.sourcemaps.init({loadMaps: true}))

      // concat files
      .pipe(plugins.concat('script.js'))
      // destination
      .pipe(gulp.dest(config.destination +'js'))
      // being minify
      .pipe(plugins.rename({suffix: '.min'}))
      // uglify
      .pipe(plugins.uglify())
      .on('error', errorHandler)

    // source mapping
    .pipe(plugins.sourcemaps.write('maps'))

    .pipe(gulp.dest(config.destination +'js'))

    // reload connect server
    .pipe(plugins.connect.reload());
});

// icons
gulp.task('icons', function() { 
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
      .pipe(gulp.dest(config.destination + 'fonts')); 
});

// images
gulp.task('images', function () {
  return gulp.src(['src/media/images/*', 'src/media/images/**/*'])
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [plugins.imageminPngquant()]
    }))
    .pipe(gulp.dest(config.destination + 'media/images'))

    // reload connect server
    .pipe(plugins.connect.reload());
});



// bower javascript files
gulp.task('bower:js', function() {
  return gulp.src(plugins.mainBowerFiles())
    // filter javascript
    .pipe(plugins.filter('*.js'))
    // uglify
    .pipe(plugins.uglify({
      compress: { negate_iife: false }
    }))
    // store in libs file
    .pipe(plugins.concat('libs.min.js'))
    .pipe(gulp.dest(config.destination +'js'));
});



// bower  css files
gulp.task('bower:css', function() {
  return gulp.src(plugins.mainBowerFiles())
    // filter css
    .pipe(plugins.filter('*.css'))
    // minify
    .pipe(plugins.minifyCss())
    // store in libs file
    .pipe(plugins.concat('libs.min.css'))
    .pipe(gulp.dest(config.destination+'css'));
});


// bower tasks
gulp.task('bower', function () {
  plugins.runSequence('bower:css', 'bower:js');
});





// watch tasks
gulp.task('watch', function () {
  gulp.watch(['src/kit/*.kit'], ['kit']);
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['scss']);
  gulp.watch(['src/js/*.js', 'src/js/src/*.js', 'src/js/src/**/*.js'], ['js']);
  gulp.watch(['src/media/images/*', 'src/media/images/**/*'], ['images']);
  gulp.watch(['src/css/*.css', 'src/js/vendor/*.css'], ['vendor']);
});


// initialize tasks
gulp.task('initialize', function () {
  plugins.runSequence('kit', 'scss', 'js', 'vendor', 'icons', 'images');
});


// default task
gulp.task('default', ['initialize', 'connect', 'watch']);



// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}