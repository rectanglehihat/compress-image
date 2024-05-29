const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new Dotenv({ path: './env/.env.development' })],
};
