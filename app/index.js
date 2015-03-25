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
    type: 'checkbox',
    name: 'features',
    message: 'Select the features you would like to enable',
    choices: [{
      name: 'Modernizr',
      value: 'includeModernizr',
      checked: true
    },{
      name: 'Selectivizr',
      value: 'includeSelectivizr',
      checked: false
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
      name: 'jQuery Advanced Scroll',
      value: 'includeJQueryAdvancedScroll',
      checked: false
    },{
      name: 'Perfect Scrollbar',
      value: 'includePerfectScrollbar',
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

  compassConfigs: function() {
    this.copy('_compass-dev.rb', 'compass-dev.rb');
    this.copy('_compass-dist.rb', 'compass-dist.rb');
  },

  runFonts: function() {
  	this.copy('runfonts.sh');
  }

  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.copy('h5bp/gitignore', '.gitignore');
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
    this.copy('h5bp/editorconfig', '.editorconfig');
  },

  mainStylesheet: function () {
    this.mkdir('resources/sass');
    this.directory('h5bp/sass/structure', 'resources/sass');
    this.copy('h5bp/sass/_normalize.scss', 'resources/sass/generic/_normalize.scss');
    this.copy('h5bp/sass/_initialize.sass', 'resources/sass/_initialize.sass');
    this.template('h5bp/sass/main.scss', 'resources/sass/main.scss');
  },

  rootFiles: function() {
  	this.directory('h5bp/root_path', 'resources/copy');
  },

  writeIndex: function () {
    this.template('h5bp/index.html', 'resources/html/index.html');
  },

  app: function () {
    this.mkdir('dist');
    this.mkdir('dev');
    this.mkdir('resources/img');
    this.mkdir('resources/sprite');
    this.mkdir('resources/font');
    this.mkdir('resources/copy');
    this.mkdir('resources/html');
    this.mkdir('resources/js');
    this.copy('h5bp/js/plugins.js', 'resources/js/plugins.js');
    this.copy('h5bp/js/main.js', 'resources/js/main.js');
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
