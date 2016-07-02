# ember-cli-sassdoc

[SassDoc](https://github.com/SassDoc/sassdoc) for [ember-cli](https://github.com/ember-cli/ember-cli) applications. Provides `ember sassdoc` command and ember-cli middleware for serving compiled SassDoc assets.

## Installation

```
ember install ember-cli-sassdoc
```

## Usage

In order to generate documentation for you Sass files, run this command inside the project root directory:

```
ember sassdoc
```

You can then access the generated documentation at http://localhost:4200/sassdoc route.

If you want to change the name of this route, set the `ENV.sassDocRoute` property in your `config/environment.js` configuration file. Also, you can change the path to directory with SassDoc assets being served, using the `ENV.sassDocDir` property.

The list of supported options of the `ember sassdoc` command:

```
ember sassdoc <options...>
  Generate documentation for Sass files
  --source (String) (Default: ./app/styles)
    aliases: -src <value>
  --exclude (String) (Default: [])
    aliases: -e <value>
  --dest (String) (Default: ./sassdoc)
    aliases: -dst <value>
  --package (String) (Default: ./package.json)
    aliases: -pkg <value>
  --theme (String) (Default: default)
    aliases: -t <value>
  --autofill (String) (Default: ["requires", "throws", "content"])
    aliases: -af <value>
  --groups (String) (Default: {"undefined": "general"})
    aliases: -g <value>
  --no-update-notifier (Boolean) (Default: false)
    aliases: -un
  --verbose (Boolean) (Default: false)
    aliases: -v
```
