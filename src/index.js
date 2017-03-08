import reactDocs from 'react-docgen';
import componentNameHandler from './handlers/componentNameHandler';


// Fetch reactDoc handlers and merge
let handlers = reactDocs.defaultHandlers;
handlers.unshift(componentNameHandler);

let json = {};

function ReactExtractComponentMeta(config = {
  'entry': /components/g,
  'output':{
    'filename': 'component-meta.json'
  }
}) {
  this.config = config;
}

ReactExtractComponentMeta.prototype.apply = function(compiler) {

  compiler.plugin('emit', function(compilation, callback) {

    // Explore each chunk (build output):
    compilation.chunks.forEach(function(chunk) {

      // Explore each module within the chunk (built inputs):
      chunk.modules.forEach(function(module) {
        
        let resourcePath = module.resource;

        // Filter react components
        if(Array.isArray(resourcePath.match(this.config.entry))){
          let source = module._source._value; 
          let componentInfo = reactDocs.parse(source, null, reactDocs.defaultHandlers);
          
          let getComponentName = componentInfo.name;
          json[getComponentName] = componentInfo;
        }
      }, this);
    }, this);

  compilation.assets[this.config.output.filename] = {
      source: function() {
        return JSON.stringify(json);
      },
      size: function() {
        return json.length;
      }
    };

    callback();
  }.bind(this));
};

module.exports = ReactExtractComponentMeta;