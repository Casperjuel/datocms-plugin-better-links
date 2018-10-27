/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new StyleLintPlugin(),
    ],
  },

  devServer: {
    host: 'localhost',
    port: 1234,
    https: {
      key: fs.readFileSync('./localhost.key'),
      cert: fs.readFileSync('./localhost.crt'),
    },
  },
}
