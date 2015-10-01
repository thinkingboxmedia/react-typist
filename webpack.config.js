const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const sassLoaders = [
  'css?sourceMap',
  'autoprefixer?browsers=last 2 version',
  'sass?sourceMap&includePaths[]=' +
    encodeURIComponent(path.resolve(__dirname, './src/styles'))
];

module.exports = {
  entry: './examples/index.js',
  output: {
    path: path.join(__dirname, './examples/dist'),
    filename: 'index.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract("style", sassLoaders.join('!'))
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel?optional=es7.classProperties', 'eslint']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css', { allChunks: true  })
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.scss'],
    modulesDirectories: ['src', 'node_modules'],
  },
};