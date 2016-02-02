var path = require('path');

module.exports = {
  watch: true,
  cache: true,
  entry: [
    './test/specs/index.js'
  ],
  output: {
    path: path.join(__dirname, 'test/static'),
    publicPath: 'test/static/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader" }
    ]
  }
};
