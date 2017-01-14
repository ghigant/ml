const path = require('path');
const webpack = require('webpack');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const isProduction = process.env.NODE_ENV === 'production' ? true : false;

console.log('isProduction', isProduction);

let productionPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin()
];

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    'vendor': ['react', 'react-dom', 'lodash', 'd3'],
    'app': './app.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build/assets'),
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"],
      include: path.resolve(__dirname, 'src')
    }, {
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
    alias: {
      'config': path.join(__dirname, 'src/config'),
      'containers': path.join(__dirname, 'src/containers'),
      'components': path.join(__dirname, 'src/components'),
      'services': path.join(__dirname, 'src/services'),
      'state': path.join(__dirname, 'src/redux'),
      'data': path.join(__dirname, 'src/data')
    }
  },
  plugins: [
    new CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(isProduction ? productionPlugins : []),
  devtool: 'source-map',
  devServer: {
    hot: false,
    inline: true,
    publicPath: '/assets/',
    host: '0.0.0.0'
  }
};
