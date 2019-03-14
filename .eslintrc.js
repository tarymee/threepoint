// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true,
    es6: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 缩进风格[不启用]
    'indent': 0,
    // 行尾不能有空格[空行可以有空格]
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    // 代码块换行规则[不启用] http://eslint.org/docs/rules/padded-blocks
    'padded-blocks': 0,
    // 空行规则[不启用] http://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': 0,
    // 变量声明后是否需要空一行[不启用]
    'newline-after-var': 0,
    // 是否禁用__proto__[不启用]
    'no-proto': 0,
    // 文件以单一的换行符结束[不启用]
    'eol-last': 0,
    // 函数定义时括号前面要不要有空格 不允许函数括号之间存在空格
    'space-before-function-paren': [0, 'always'],
    // 一元运算符的前/后要不要加空格
    'space-unary-ops': 0,
    // 不允许定义未使用的变量 不启用
    'no-unused-vars': 0,
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 0
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    swan: true,
    tt: true,
    my: true,
    getApp: true,
    getPage: true,
    requirePlugin: true,
    mpvue: true,
    mpvuePlatform: true
  }
}
