# React Extract Component Metadata
[![npm](https://img.shields.io/npm/v/npm.svg)]()

`react-extract-component-meta` is a Webpack plugin to extract [React](https://github.com/facebook/react) component metadata. It generates a JSON file as output.

# Installation

Install the module directly from npm:

```
npm install --save-dev react-extract-component-meta
```

## Usage
Import the plugin in your webpack.config.js file and create a new instance.

```Javascript
const ReactExtractComponentMeta = require('react-extract-component-meta');

module.exports = {
    ...    
    plugins: [new ReactExtractComponentMeta()]
};
```

# Changelog
The changelog can be found on the [Change-log](https://github.com/sun1l/react-extract-component-meta/CHANGELOG.md) page.

# Authors and license

[Sunil Kumar](https://twitter.com/sun1lkumar)

MIT License, see the included License.md file.