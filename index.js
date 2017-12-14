const express = require('express');
const sassDocCommand = require('./lib/commands/sassdoc');

module.exports = {
  name: 'ember-cli-sassdoc',

  config(environment, appConfig) {
    this.docDir = appConfig.sassDocDir || 'sassdoc';
    this.docRoute = appConfig.sassDocRoute || 'sassdoc';
    return {
      sassDocDir: this.docDir,
      sassDocRoute: this.docRoute,
    };
  },

  serverMiddleware(config) {
    const app = config.app;
    const options = config.options;
    app.use(options.baseURL + this.docRoute, express.static(this.docDir));
  },

  includedCommands() {
    return {
      sassdoc: sassDocCommand,
    };
  },
};
