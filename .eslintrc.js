module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'vue/valid-v-slot': 'off'
  }
}
