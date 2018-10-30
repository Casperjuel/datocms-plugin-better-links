/* eslint-disable no-template-curly-in-string */
module.exports = {
  presets: [
    '@vue/app',
  ],
  env: {
    test: {
      plugins: [
        [
          'transform-imports', {
            'lodash-es': {
              transform: 'lodash/${member}',
              preventFullImport: true,
            },
          },
        ],
      ],
    },
  },
}
