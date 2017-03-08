import recast from 'recast';
import {utils} from 'react-docgen';

var {types: {namedTypes: types}} = recast;

function componentNameHandler(documentation, path){
  let className = null;

  if(utils.isReactComponentClass(path)){
    let node = path.node;

    if(types.ClassDeclaration.check(node)){
      className = utils.getNameOrValue(path.get('id', 'name'));
    }
  }

  if(className){
    documentation.set('name', className);
  }
}

export default componentNameHandler;