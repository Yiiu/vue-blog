var webpack = require('webpack');
var path = require('path');
module.exports = {
    devtool: false,
    entry: {
      bundle:'./test/main.js',
      vendors: ['vue','vue-router'],
    },
    output: {
        path: "./dist",
        filename: "./script/[name].js",
        chunkFilename: './script/[id]-or.js'
    },
    module: {
        loaders: [
            { test: /\.vue$/ , loader: "vue"},
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.less$/, loader: 'style!css!less!autoprefixer'},
            {test: /\.(png|jpg)$/, loader: "url-loader?limit=8192"}
        ]
    },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }, 
    resolve: {
        extensions: ['', '.js', '.vue'],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', './script/vendors.js'),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
    ]
}