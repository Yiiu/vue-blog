var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    devtool: false,
    entry: {
      bundle:'./test/main.js',
      vendors: ['vue','vue-router'],
    },
    output: {
        path: __dirname + '/dist/',
        filename: "./script/[name].js",
        chunkFilename: './script/[id]-or.js'
    },
    module: {
        loaders: [
            { test: /\.vue$/ , loader: "vue"},
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader!autoprefixer' }, // use ! to chain loaders
            { test: /\.(eot|woff|svg|ttf)$/, loader: "file-loader" },
            { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192"}
        ]
    },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
    resolve: {
      extensions: ['', '.js', '.vue'],
      alias: {
        'src': './test/assets/styles',
        'assets': path.resolve(__dirname, 'test/assets'),
        'components': path.resolve(__dirname, 'test/components')
      }
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
