import * as parser from '@babel/parser';

export function getAST(codeStr: string) {
  return parser.parse(codeStr, {
    sourceType: 'module',
    plugins: [
      "jsx",
    ]
  });
}

export function getVueObj(vueStr: string) {
  const templateReg = /<template>([\s\S])*<\/template>/
  const scriptReg = /(?<=<script>)[\s\S]*(?=<\/script>)/
  const styleReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/
  const i18nReg = /(?<=<i18n[\s\S]*>)[\s\S]*(?=<\/i18n>)/
  const obj: any = {}
  const templateResult = templateReg.exec(vueStr)
  const scriptResult = scriptReg.exec(vueStr)
  const styleResult = styleReg.exec(vueStr)
  const i18nResult = i18nReg.exec(vueStr)
  if (templateResult) {
    obj['template'] = templateResult[0]
  }
  if (scriptResult) {
    obj['script'] = scriptResult[0]
  }
  if (styleResult) {
    obj['style'] = styleResult[0]
  }
  if (i18nResult) {
    obj['i18n'] = i18nResult[0]
  }
  return obj
}