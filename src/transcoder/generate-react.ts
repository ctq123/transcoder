import { getAST, getVueObj } from '../utils'
// import * as generate from '@babel/generator';
import traverse from '@babel/traverse';

export async function transform(codeStr: string) {
  try {
    const vueObj = getVueObj(codeStr);
    console.log("vueObj", vueObj);
    const ast: any = getAST(vueObj.script);
    // const code = generate.default(ast).code;
    console.log("ast", ast);
    traverse(ast, {
      ObjectExpression: (path: any) => {
        if (path.parent.type === 'VariableDeclarator') {
          const {node} = path;
          console.log("var", node.properties)
        }
      },
      ObjectProperty: (path: any) => {
        const {node} = path;
        if (node.key.name === 'methods') {
          console.log("methods", node.value.properties)
        }
      }
    });
  } catch(e) {
    console.error("transform", e)
  }
}
