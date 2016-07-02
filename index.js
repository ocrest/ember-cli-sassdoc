var sassdoc = require('sassdoc');
var express = require('express');
var sassDocCommand = require('./lib/commands/sassdoc');

module.exports = {
  name: 'ember-cli-sassdoc',

  config: function (environment, appConfig) {
    this.docDir = appConfig.sassDocDir || 'sassdoc'
    this.docRoute = appConfig.sassDocRoute || 'sassdoc';
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
