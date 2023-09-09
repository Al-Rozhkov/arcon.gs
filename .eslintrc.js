module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['gridsome'],
  extends: ['plugin:gridsome/recommended'],
  rules: {
    'gridsome/format-query-block': 'error',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
