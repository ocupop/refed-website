var clientname        = 'refed';
var src               = 'src';
var srcAssets         = 'src/_assets';
var bowerAssets       = 'bower_components';



module.exports = {
  bower: {
    debugging: true,
    includeDev: true,
    dest: src + '/libs',
    paths: {
      bowerDirectory: bowerAssets,
      bowerrc: './.bowerrc',
      bowerJson: './bower.json'
    }
  },
  optimize: {
    css: {
      src:  srcAssets + '/css/*.css',
      dest: '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src:  srcAssets + '/js/*.js',
      dest: '/js/',
      options: {}
    },
    images: {
      src:  srcAssets + '/img/**/*.{jpg,jpeg,png,gif}',
      dest: '/img/',
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    }
  },
};
