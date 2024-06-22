const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]_[contenthash:8].css',
    }),
    new Dotenv({ path: './env/.env.production' }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  externals: {
    react: 'react',
  },
};
