'use strict';

module.exports = function (grunt) {
  var bower = grunt.file.readJSON('.bowerrc'),
  <% if (includeModernizr) { %>
  jsHeaderFiles = [
      'resources/js/vendor/modernizr-2.8.3.min.js'
  ],
  <% } %>
  jsFooterFiles = [
    <% if (includeJQueryEasing) { %>bower.directory+'/jquery.easing/js/jquery.easing.js'<% } %>
    <% if (includeJQueryBezier) { %>,bower.directory+'/jquery-bez/jquery.bez.min.js'<% } %>
    <% if (includeJQueryMousewheel) { %>,bower.directory+'/jquery-mousewheel/jquery.mousewheel.js'<% } %>
    <% if (includeNicescroll) { %>,bower.directory+'/jquery_nicescroll/nicescroll.js'<% } %>
    <% if (includeJQueryHotkeys) { %>,bower.directory+'/jquery.hotkeys/jquery.hotkeys.js'<% } %>
    <% if (includeUniqueId) { %>,bower.directory+'/uniqueid/unique_id.js'<% } %>
    <% if (includeJQueryAdvancedScroll) { %>,bower.directory+'/jquery.advancedscroll/jquery.advancedScroll.js'<% } %>
    <% if (includeJQueryAdvancedBreak) { %>,bower.directory+'/jquery.advancedbreak/jquery.advancedBreak.js'<% } %>
    ,'resources/js/plugins.js'
    ,'resources/js/main.js'
  ];

  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        options: {
          banner: "/*! <%= pkg.name %> - <%= pkg.version %> */",
          mangle: true,
          compress: false,
          wrap: false,
          exportAll: false,
          beautify: false,
          sourceMap: true
        },
        files: {
          <% if (includeModernizr) { %>
          'dist/assets/js/header.js': jsHeaderFiles,
          <% } %>
          'dist/assets/js/footer.js': jsFooterFiles
          <% if (includeSelectivizr) { %>
          ,'dist/assets/js/ie.js' : [
              '<% bower.directory %>/lt-ie-9/lt-ie-9.js'
          ]
          <% } %>
        }
      },
      dev: {
        options: {
          preserveComments: false,
          mangle: false,
          compress: false,
          wrap: false,
          exportAll: false,
          beautify: {
            width: 80,
            beautify: true
          },
          sourceMap: true
        },
        files: {
          'dev/assets/js/header.js': jsHeaderFiles
          , 'dev/assets/js/footer.js': jsFooterFiles
          <% if (includeSelectivizr) { %>
          ,'dev/assets/js/ie.js' : [
              '<% bower.directory %>/lt-ie-9/lt-ie-9.js'
            ]
          <% } %>
        }
      }
    },

    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'resources/js/vendor/',
            src: '**',
            dest: 'dev/assets/js/vendor/'
          },
          {
            expand: true,
            cwd: 'resources/copy/',
            src: '**',
            dest: 'dev/'
          },
          {
            expand: true,
            cwd: 'resources/font/',
            src: '**',
            dest: 'dev/assets/font/'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'resources/js/vendor/',
            src: '**',
            dest: 'dist/assets/js/vendor/'
          },
          {
            expand: true,
            cwd: 'resources/copy/',
            src: '**',
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'resources/font/',
            src: '**',
            dest: 'dist/assets/font/'
          }
        ]
      }
    },

    compass: {
      dev: {
        options: {
          config: 'compass-dev.rb',
          environment: 'development',
          sourcemap: true
        }
      },
      dist: {
        options: {
          config: 'compass-dist.rb',
          environment: 'production',
          force: true,
          sourcemap: true
        }
      }
    },//sass

    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: false,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: 'resources/html/',
          src: '**/*.html',
          dest: 'dev/'
        }]
        //files: {
        //    'dev/index.html': 'resources/html/index.html'
        //}
      },
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          conservativeCollapse: true
        },
        files: [{
          expand: true,
          cwd: 'resources/html/',
          src: '**/*.html',
          dest: 'dist/'
        }]
        //files: {
        //    'dist/index.html': 'resources/html/index.html'
        //}
      }
    },

    imagemin: {
      dev: {
        files: [{
          expand: true,
          cwd: 'resources/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dev/assets/img/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'resources/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets/img/'
        }]
      }
    },

    watch: {
      configs: {
        files: [
          'resources/copy/**/*.*',
          'resources/font/**/*',
          'resources/js/vendor/**/*'
        ],
        options: {
          livereload: false
        },
        tasks: ['copy:dev']
      },
      css: {
        files: [
          './resources/sass/**/*.sass',
          './resources/sass/**/*.scss'
        ],
        options: {
          livereload: false
        },
        tasks: ['compass:dev']
      },
      js: {
        files: [
          'resources/js/**/*.js'
        ],
        options: {
          livereload: false
        },
        tasks: ['uglify:dev']
      },
      html: {
        files: [
          'resources/html/**/*.html'
        ],
        options: {
          livereload: false
        },
        tasks: ['htmlmin:dev']
      },
      grunt: {
        files: ['Gruntfile.js']
      },
      images: {
        files: [
          'resources/img/**/*'
        ],
        options: {
          livereload: false
        },
        tasks: ['imagemin:dev', 'imagemin:dist']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('default', ['copy:dev', 'htmlmin:dev', 'uglify:dev', 'imagemin:dev', 'compass:dev']);

  grunt.registerTask('w', ['watch']);

  grunt.registerTask('deploy', ['copy:dist', 'htmlmin:dist', 'uglify:dist', 'imagemin:dist', 'compass:dist']);
};
