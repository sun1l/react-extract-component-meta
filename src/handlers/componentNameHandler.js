import recast from 'recast';
import reactDocs from 'react-docgen';

var {types: {namedTypes: types}} = recast;

function componentNameHandler(documentation, path){
  let className = null;

  if(reactDocs.utils.isReactComponentClass(path)){
    let node = path.node;

    if(types.ClassDeclaration.check(node)){
      className = reactDocs.utils.getNameOrValue(path.get('id', 'name'));
    }
  }

  if(className){
    documentation.set('name', className);
  }
}

export default componentNameHandler;