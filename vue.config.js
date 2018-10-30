/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs')
const StyleLintPlugin = require('stylelint-webpack-plugin')
// const packageJson = require('./package.json')

module.exports = {
  productionSourceMap: false,

  // baseUrl: process.env.NODE_ENV === 'production'
  //   ? `https://unpkg.com/${packageJson.name}@${packageJson.version}/dist/`
  //   : '/',

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
