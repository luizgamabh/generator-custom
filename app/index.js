'use strict';
var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(require('yosay')());
      this.log(chalk.magenta(
        'Thanks for using Custom Generator.'
      ));
    }

    var prompts = [{
    type: 'list',
    name: 'features',
    message: 'Select the features you would like to add',
    choices: [{
      name: 'Modernizr',
      value: 'includeModernizr',
      checked: true
    },{
      name: 'Selectivizr',
      value: 'includeSelectivizr',
      checked: true
    },{
      name: 'Custom Grid System',
      value: 'includeCustom',
      checked: true
    },{
      name: 'jQuery Easing',
      value: 'includeJQueryEasing',
      checked: true
    },{
      name: 'jQuery Bezier',
      value: 'includeJQueryBezier',
      checked: false
    },{
      name: 'jQuery Mousewheel',
      value: 'includeJQueryMousewheel',
      checked: true
    },{
      name: 'Nicescroll',
      value: 'includeNicescroll', // falta jogar no bower e pimba ;D
      checked: true
    },{
      name: 'jQuery Hotkeys',
      value: 'includeJQueryHotkeys',
      checked: false
    },{
      name: 'UniqueId',
      value: 'includeUniqueId',
      checked: false
    },{
      name: 'jQuery Advanced Scroll',
      value: 'includeJQueryAdvancedScroll',
      checked: false
    },{
      name: 'jQuery Advanced Break',
      value: 'includeJQueryAdvancedBreak',
      checked: false
    }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      this.includeCustom = answers.includeCustom;
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeSelectivizr = hasFeature('includeSelectivizr');
      this.includeCustom = hasFeature('includeCustom');
      this.includePerfectScrollbar = hasFeature('includePerfectScrollbar');
      this.includeJQueryEasing = hasFeature('includeJQueryEasing');
      this.includeJQueryBezier = hasFeature('includeJQueryBezier');
      this.includeJQueryMousewheel = hasFeature('includeJQueryMousewheel');
      this.includeNicescroll = hasFeature('includeNicescroll');
      this.includeJQueryHotkeys = hasFeature('includeJQueryHotkeys');
      this.includeUniqueId = hasFeature('includeUniqueId');
      this.includeJQueryAdvancedScroll = hasFeature('includeJQueryAdvancedScroll');
      this.includeJQueryAdvancedBreak = hasFeature('includeJQueryAdvancedBreak');

      done();
    }.bind(this));
  },

  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.template('h5bp/gitignore', '.gitignore');
    this.copy('h5bp/gitattributes', '.gitattributes');
  },

  bower: function () {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {}
    };

    bower.dependencies.jquery = '~1.11.1';

    if (this.includeCustom) {
      bower.dependencies['custom.gs'] = '~2.1.1';
    }
    if (this.includeJQueryAdvancedBreak) {
      bower.dependencies['jquery.advancedbreak'] = "~0.0.1";
    }
    if (this.includeJQueryAdvancedScroll) {
      bower.dependencies['jquery.advancedscroll'] = "~0.0.1";
    }
    if (this.includePerfectScrollbar) {
      bower.dependencies['perfect-scrollbar'] = "~0.6.1";
    }
    if (this.includeJQueryBezier) {
      bower.dependencies['jquery-bez'] = "rdallasgray/bez#~1.0.11"
    }
    if (this.includeJQueryEasing) {
      bower.dependencies['jquery.easing'] = "~1.3.1";
    }
    if (this.includeJQueryHotkeys) {
      bower.dependencies['jquery.hotkeys'] = "jeresig/jquery.hotkeys#~0.2.0";
    }
    if (this.includeJQueryMousewheel) {
      bower.dependencies['jquery-mousewheel'] = "~3.1.12";
    }
    if (this.includeNicescroll) {
      bower.dependencies['jquery_nicescroll'] = "~0.9.9";
    }
    if (this.includeUniqueId) {
      bower.dependencies['uniqueid'] = "~0.0.1";
    }

    this.copy('bowerrc', '.bowerrc');
    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  modernizr: function() {
    if (this.includeModernizr) {
      this.copy('h5bp/js/vendor/modernizr-2.8.3.min.js', 'resources/js/vendor/modernizr-2.8.3.min.js')
    }
  },

  jshint: function () {
    this.copy('jshintrc', '.jshintrc');
  },

  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  mainStylesheet: function () {
    var css = 'main.sass';
    this.template(css, 'app/styles/' + css);
  },

  writeIndex: function () {
    this.indexFile = this.engine(
      this.readFileAsString(join(this.sourceRoot(), 'index.html')),
      this
    );

    // wire Bootstrap plugins
    if (this.includeBootstrap) {
      var bs = 'bower_components/bootstrap/js/';

      this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        optimizedPath: 'scripts/plugins.js',
        sourceFileList: [
          bs + 'affix.js',
          bs + 'alert.js',
          bs + 'dropdown.js',
          bs + 'tooltip.js',
          bs + 'modal.js',
          bs + 'transition.js',
          bs + 'button.js',
          bs + 'popover.js',
          bs + 'carousel.js',
          bs + 'scrollspy.js',
          bs + 'collapse.js',
          bs + 'tab.js'
        ],
        searchPath: '.'
      });
    }

    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'scripts/main.js',
      sourceFileList: ['scripts/main.js'],
      searchPath: ['app', '.tmp']
    });
  },

  app: function () {
    this.directory('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/images');
    this.write('app/index.html', this.indexFile);

    this.copy('main.js', 'app/scripts/main.js');
  },

  install: function () {
    this.on('end', function () {

      if (!this.options['skip-install']) {
        this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install']
        });
      }
    });
  }
});
