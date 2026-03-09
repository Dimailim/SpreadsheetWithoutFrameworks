const {
  defineConfig,
} = require('eslint/config');

const babelParser = require('@babel/eslint-parser');
const globals = require('globals');
const js = require('@eslint/js');

const {
  FlatCompat,
} = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([{
  languageOptions: {
    parser: babelParser,

    parserOptions: {
      babelOptions: {
        configFile: './babel.config.json',
      },
    },

    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },

  extends: compat.extends('eslint:recommended', 'google'),
  rules: {
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    'comma-dangle': 'off',
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 'off',
  },
}]);
