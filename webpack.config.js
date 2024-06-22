const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const productionConfig = require('./webpack.prod.js');
const developmentConfig = require('./webpack.dev.js');
const esModuleConfig = require('./webpack.esm.js');

module.exports = (env, args) => {
  const configs = [commonConfig];

  switch (args.mode) {
    case 'development':
      configs.push(developmentConfig);
      break;
    case 'production':
      configs.push(productionConfig);
      break;
    default:
      throw new Error('No matching configuration was found!');
  }

  if (env && env.esm) {
    configs.push(esModuleConfig);
  }

  return merge(...configs);
};
