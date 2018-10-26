/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const postcssPresetEnv = require('postcss-preset-env')
const tailwindcss = require('tailwindcss')

const plugins = [
  autoprefixer,
  postcssFlexbugsFixes,
  postcssPresetEnv({
    autoprefixer: {
      flexbox: 'no-2009',
    },
    stage: 3,
  }),
  tailwindcss('tailwind.config.js'),
]

module.exports = { plugins }
