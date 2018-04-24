const path = require('path');

module.exports = {
  entry: './src/exports.js',
  mode: 'development',

  output: {
    filename: 'u2d.min.js',
    path: path.resolve(__dirname),
    library: 'U2D'
  }
};
