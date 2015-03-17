'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('appname', {type: String, required: true});
    this.appname = this._.camelize(this.appname);
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('custom') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'customGsOption',
      message: 'Would you like to enable custom grid system?',
      default: true,
      store: true // saves the answer
    }];

    this.prompt(prompts, function (props) {
      this.customGsOption = props.customGsOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );

      this.mkdir('resources');
      this.mkdir('resources/sass');
      this.mkdir('resources/js');
      this.mkdir('resources/copy');
      this.mkdir('resources/font');
      this.mkdir('resources/html');
      this.mkdir('resources/img');
      this.mkdir('resources/sprite');

      this.fs.directory(
        this.templatePath('h5bp/sass'),
        this.destinationPath('resources/sass')
      );
      this.fs.directory(
        this.templatePath('h5bp/js'),
        this.destinationPath('resources/js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_compass-dev.rb'),
        this.destinationPath('compass-dev.rb')
      );
      this.fs.copy(
        this.templatePath('_compass-dist.rb'),
        this.destinationPath('compass-dist.rb')
      );
      this.fs.copy(
        this.templatePath('h5bp/gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('h5bp/gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('h5bp/htaccess'),
        this.destinationPath('.htaccess')
      );
      this.fs.copy(
        this.templatePath('h5bp/editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copyTpl(
        this.templatePath('h5bp/index.html'),
        this.destinationPath('resources/index.html'),
        { title: this.appname }
      );
      this.fs.copyTpl(
        this.templatePath('h5bp/')
      )
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  end: function() {
  }
});
