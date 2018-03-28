const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: 'development',

  output: {
    filename: 'u2d.min.js',
    path: path.resolve(__dirname)
  }
};
