import {parse, defaultHandlers as handlers} from 'react-docgen';
import componentNameHandler from './handlers/componentNameHandler';

// Merge custom handlers with reactDoc defaultHandlers
handlers.unshift(componentNameHandler);

let json = {};

function ReactExtractComponentMeta(config = {}) {
  this.config = {};
  let configDefaults = {
    'filter': /component/gi,
    'output': {
      'filename': 'components-meta.json'
    }
  }
  
  Object.assign(this.config, configDefaults, config);
}

ReactExtractComponentMeta.prototype.apply = function (compiler) {

  // Get compilation instance
  compiler.plugin('emit', function (compilation, callback) {

    // Explore each chunk in the compilation
    compilation.chunks.forEach(function (chunk) {

      // Explore each module within the chunk
      chunk.modules.forEach(function (module) {

        let resourcePath = module.rawRequest;

        // Filter through the valid files as specified in config
        if (Array.isArray(resourcePath.match(this.config.filter))) {
          let source = module._source._value;
          let componentInfo = {};

          // Parse the source with reactDoc.parse
          try{
            componentInfo = parse(source, null, handlers);
          }
          catch(e){
            console.log(resourcePath + " is not a React Component" + "\n");
          }

          if(componentInfo.name){
            let getComponentName = componentInfo.name;
            json[getComponentName] = componentInfo;
          }
        }
      }, this);
    }, this);

    // Add the JSON file in assets
    json = JSON.stringify(json);
    compilation.assets[this.config.output.filename] = {
      source: function () {
        return json;
      },
      size: function () {
        return json.length;
      }
    };

    callback();
  }.bind(this));
};

module.exports = ReactExtractComponentMeta;