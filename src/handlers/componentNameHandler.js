import {types} from 'recast';
import {utils} from 'react-docgen';

function componentNameHandler(documentation, path){
  let className = null;

  if(utils.isReactComponentClass(path)){
    let node = path.node;

    if(types.namedTypes.ClassDeclaration.check(node)){
      className = utils.getNameOrValue(path.get('id', 'name'));
    }
  }

  if(className){
    documentation.set('name', className);
  }
}

export default componentNameHandler;