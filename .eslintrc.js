module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['react-app', 'prettier', "plugin:cypress/recommended"
    // 'plugin:react/recommended',
    // 'standard'
  ],
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'printWidth': 80,
        'trailingComma': 'es5',
        'semi': false,
        'jsxSingleQuote': true,
        'singleQuote': true,
        'useTabs': true,
        "endOfLine": "auto"
      }
    ]
  }
}
