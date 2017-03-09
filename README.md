# React Extract Component Metadata
[![npm](https://img.shields.io/npm/v/react-extract-component-meta.svg)](https://www.npmjs.com/package/react-extract-component-meta)

`react-extract-component-meta` is a Webpack plugin to extract [React](https://github.com/facebook/react) component metadata. It generates a JSON file as output.

# Installation

Install the module directly from npm:

```
npm install --save-dev react-extract-component-meta
```

# Usage
Import the plugin in your webpack.config.js file and create a new instance.

```Javascript
const ReactExtractComponentMeta = require('react-extract-component-meta');

module.exports = {
    ...    
    plugins: [new ReactExtractComponentMeta()]
};
```
`react-extract-component-meta` accpets a config object which allows you to specify the pattern to match your react components as well as name of the output JSON file.

```Javascript
const ReactExtractComponentMeta = require('react-extract-component-meta');

module.exports = {
    ...    
    plugins: [new ReactExtractComponentMeta({
        'filter': /component/gi,
        'output': {
            'filename': 'components-meta.json'
        }
    })]
};
```

Sample JSON file output

```Javascript
{
    "MyComponent": {
        "name": "MyComponent",
        "description": "MyComponent description",
        "methods": [
            {
                "name": "someFuction",
                "docblock": "Component function description",
                "modifiers": [],
                "params": [],
                "returns": null,
                "description": "Component function description"
            }
        ],
        "props": {
            "someProp": {
                "type": {
                    "name": "custom",
                    "raw": "PropTypes.string.isrequired"
                },
                "required": false,
                "description": ""
            },
            "someMoreProp": {
                "type": {
                    "name": "custom",
                    "raw": "PropTypes.array"
                },
                "required": false,
                "description": ""
            }
        }
    },
    
    "MyOtherComponent": {
        ...
    }
    ...
}

```

# Changelog
The changelog can be found on the [Change log](https://github.com/sun1l/react-extract-component-meta/blob/master/CHANGELOG.md) page.

# Authors and license

[Sunil Kumar](https://twitter.com/sun1lkumar)

MIT License, see the included [License](https://github.com/sun1l/react-extract-component-meta/blob/master/LICENSE) file.