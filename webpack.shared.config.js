const DotenvPlugin = require('dotenv-webpack')

module.exports = {
  plugins: [
    new DotenvPlugin({
      path: `./${process.env.ENV_FILE || '.env.default'}`
    })
  ]
}
