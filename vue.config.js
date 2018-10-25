const fs = require('fs')

module.exports = {
  devServer: {
    host: 'localhost',
    port: 1234,
    https: {
      key: fs.readFileSync('./localhost.key'),
      cert: fs.readFileSync('./localhost.crt'),
    },
  },
}
