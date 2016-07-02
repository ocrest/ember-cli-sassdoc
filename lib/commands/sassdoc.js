var sassdoc = require('sassdoc');
var UI = require('ember-cli/lib/ui');
var chalk = require('chalk');

module.exports = {
  name: 'sassdoc',
  description: 'Generate documentation for Sass files',
  availableOptions: [
    { name: 'source',   type: String,  default: './app/styles',   aliases: ['src'] },
    { name: 'exclude',  type: String,  default: '[]',             aliases: ['e'] },
    { name: 'dest',     type: String,  default: './sassdoc',      aliases: ['dst'] },
    { name: 'package',  type: String,  default: './package.json', aliases: ['pkg'] },
    { name: 'theme',    type: String,  default: 'default',        aliases: ['t'] },
    { name: 'autofill', type: String,  default: '["requires", "throws", "content"]', aliases: ['af'] },
    { name: 'groups',   type: String,  default: '{"undefined": "general"}', aliases: ['g'] },
    { name: 'verbose',  type: Boolean, default: false,            aliases: ['v'] },
    { name: 'config',   type: String,  default: '.sassdocrc',     aliases: ['c'] },
  ],
  works: 'insideProject',
  run: function (args) {
    var self = this;
    var sassDocEnv = new sassdoc.Environment(new sassdoc.Logger);
    var options = sassDocEnv.tryParseFile(args.config);
    var cmdOptions = {
      exclude: args.exclude,
      dest: args.dest,
      package: args.package,
      theme: args.theme,
      autofill: args.autofill,
      groups: args.groups,
      verbose: args.verbose,
    };

    if (!options) {
      options = cmdOptions;
    } else {
      for (option in cmdOptions) {
        var defaultOptionValue = this.availableOptions.find(function (element) {
          return element.name == option;
        }).default;

        // Override options set in .sassdocrc with user defined cmd options:
        if (cmdOptions[option] != defaultOptionValue) {
          options[option] = cmdOptions[option];
        }
      }
    }

    var possibleJsonValues = ['exclude', 'autofill', 'groups'];
    possibleJsonValues.forEach(function (option) {
      if (typeof options[option] == 'string') {
        options[option] = JSON.parse(options[option]);
      }
    });

    this.ui.startProgress(chalk.green('Generating documentation...'), chalk.green('.'));
    return sassdoc(args.source, options).then(function () {
      self.ui.stopProgress();
      self.ui.writeLine(chalk.green('Sass documentation has been generated.'));
    }, function (err) {
      self.ui.stopProgress();
      self.ui.writeError(err);
    });
  },
};
