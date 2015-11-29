var webpack = require('webpack');
var path = require('path');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  cache: true,
  entry: {
    main:  './src/index.jsx'
  },
  output: {
    path: 'public/build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
          test: /\.jsx?$/ ,
          loader: 'babel-loader',
          include: [
              path.resolve(__dirname, 'src')
          ],
          query: {
              plugins: ['transform-runtime'],
              presets: ['es2015', 'stage-0', 'react']
          }
      }
    ]
  },
  plugins: [
    definePlugin,
    commonsPlugin
  ]
};
