module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: ['error', 'never'],

    'comma-dangle': [2, 'always-multiline'],

    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['router-link', 'router-view', 'component'],
      },
    ],

    // Giving a false positive for components like Header, Link, Img etc...
    'vue/no-unused-components': false,

    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false,
    }],

    'func-names': 0,

    'import/extensions': ['error', 'always', {
      vue: 'never',
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
  },
}
