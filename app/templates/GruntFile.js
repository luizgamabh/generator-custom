'use strict';

module.exports = function (grunt) {
  var bower = grunt.file.readJSON('.bowerrc'),
    jsHeaderFiles = [], jsFooterFiles = [];
  // Header
  <% if (includeModernizr) { %>jsHeaderFiles[] = 'resources/js/vendor/modernizr-custom.js';<% } %>

  // Footer
  <% if (includeJQueryEasing) { %>jsFooterFiles[] = bower.directory+'/jquery.easing/js/jquery.easing.js';<% } %>
  <% if (includeJQueryBezier) { %>jsFooterFiles[] = bower.directory+'/jquery-bez/jquery.bez.min.js';<% } %>
  <% if (includeJQueryMousewheel) { %>jsFooterFiles[] = bower.directory+'/jquery-mousewheel/jquery.mousewheel.js';<% } %>
  <% if (includeNicescroll) { %>jsFooterFiles[] = bower.directory+'/jquery_nicescroll/nicescroll.js';<% } %>
  <% if (this.includePerfectScrollbar) { %>jsFooterFiles[] = bower.directory+'/perfect-scrollbar/js/perfect-scrollbar.jquery.js';<% } %>
  <% if (includeJQueryHotkeys) { %>jsFooterFiles[] = bower.directory+'/jquery.hotkeys/jquery.hotkeys.js';<% } %>
  <% if (includeUniqueId) { %>jsFooterFiles[] = bower.directory+'/uniqueid/unique_id.js';<% } %>
  <% if (includeJQueryAdvancedScroll) { %>jsFooterFiles[] = bower.directory+'/jquery.advancedscroll/jquery.advancedScroll.js';<% } %>
  <% if (includeJQueryAdvancedBreak) { %>jsFooterFiles[] = bower.directory+'/jquery.advancedbreak/jquery.advancedBreak.js';<% } %>
  jsFooterFiles[] = 'resources/js/plugins.js';
  jsFooterFiles[] = 'resources/js/main.js';

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    <% if (includeModernizr) { %>
    modernizr_builder: {
      build: {
        options: {
          config: bower.directory+'/modernizr/lib/config-all.json',
            dest: bower.directory+'/modernizr/dist/modernizr-custom.js'
        }
      }
    },
    modernizr: {
      dist: {
        devFile: bower.directory+"/modernizr/dist/modernizr-custom.js",
        outputFile: "dist/assets/js/vendor/modernizr-custom.js",
        parseFiles: true,
        customTests: [],
        //tests: [
          // Tests
        //],
        //extra: {
        //  'shiv' : true,
        //    'printshiv' : false,
        //    'load' : true,
        //    'mq' : false,
        //    'cssclasses' : true
        //},
        extensibility: [
          "setClasses"
        ],
        uglify: true
      }
    },
    %>
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
            dest: 'dev/',
            dot: true
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
            dest: 'dist/',
            dot: true
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
          livereload: false,
          dot: true
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

  <% if (includeModernizr) { %>
  grunt.loadNpmTasks('grunt-modernizr-builder');
  grunt.loadNpmTasks('grunt-modernizr');
  <% } %>
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
