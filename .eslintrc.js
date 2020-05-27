module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/recommended'],
  globals: {
      window: true
  },
  env: {
      browser: true,
      node: true
  },
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': ['error', 'never'],
    'no-plusplus': 'off',
    'no-undef': 'off',
    'semi': 0,
    "vue/attribute-hyphenation": ["error", "always", { "ignore": ["sortKey", "defaultSort", "use_textLeft", "use_textRight", "hide-label"] }],
    'no-param-reassign': ['error', { 'props': false }],
    'one-var': ['error', 'never' ],
    'eqeqeq': ['error', 'smart'],
    'import/first': 0,
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    'vue/max-attributes-per-line': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'camelcase': [2, {'properties': 'never'}],
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'never',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 2,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': false,
      'ignores': []
    }]
  }
}
