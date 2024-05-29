const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new Dotenv({ path: './env/.env.development' })],
};
