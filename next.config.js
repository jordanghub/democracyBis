const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
};
