var sassdoc = require('sassdoc');
var express = require('ember-cli/node_modules/express');
var sassDocCommand = require('./lib/commands/sassdoc');

module.exports = {
  name: 'ember-cli-sassdoc',

  config: function (environment, appConfig) {
    this.docDir = appConfig.sassDocDir || 'sassdoc'
    this.docRoute = appConfig.sassDocRoute || this.docDir;
    return {
      sassDocDir: this.docDir,
      sassDocRoute: this.docRoute,
    }
  },

  serverMiddleware: function (config) {
    var app = config.app;
    var options = config.options;
    app.use(options.baseURL + this.docRoute, express.static(this.docDir));
  },

  includedCommands: function () {
    return {
      'sassdoc': sassDocCommand,
    };
  },
};
