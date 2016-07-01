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
    { name: 'no-update-notifier', type: Boolean, default: false,  aliases: ['un'] },
    { name: 'verbose',  type: Boolean, default: false,            aliases: ['v'] },
  ],
  works: 'insideProject',
  run: function (args) {
    var self = this;
    this.ui.startProgress(chalk.green('Generating documentation...'), chalk.green('.'));
    return sassdoc(args.source, {
      dest: args.dest,
      exclude: JSON.parse(args.exclude),
      package: args.package,
      theme: args.theme,
      autofill: JSON.parse(args.autofill),
      groups: JSON.parse(args.groups),
      'no-update-notifier': args['no-update-notifier'],
      verbose: args.verbose,
    }).then(function () {
      self.ui.stopProgress();
      self.ui.writeLine(chalk.green('Sass documentation has been generated.'));
    }, function (err) {
      self.ui.stopProgress();
      self.ui.writeError(err);
    });
  },
};
