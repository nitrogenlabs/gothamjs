import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';
import * as SvgStore from 'webpack-svgstore-plugin';

import {appConfig} from './build/config';

const config = {
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  devtool: 'source-map',
  entry: appConfig.path.src.entry,
  externals: {},
  module: {
    rules: [
      {
        loader: 'awesome-typescript-loader',
        test: /\.tsx?$/
      },
      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/
      },
      {
        loader: 'style-loader!css-loader!postcss-loader',
        test: /\.css$/
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_VERSION': JSON.stringify(appConfig.version),
      'process.env.NODE_ENV': JSON.stringify(appConfig.env),
      'window.APP_VERSION': JSON.stringify(appConfig.version),
      'window.NODE_ENV': JSON.stringify(appConfig.env)
    }),
    // new HtmlWebpackPlugin({
    //   external: appConfig.external,
    //   filename: appConfig.absolute(appConfig.directories[appConfig.env], appConfig.filenames.index),
    //   hash: false,
    //   inject: false,
    //   template: appConfig.absolute(appConfig.directories.src, appConfig.filenames.index),
    //   title: appConfig.title
    // }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html'
    }),
    new SvgStore({
      svgoOptions: {
        plugins: [
          {removeTitle: true}
        ]
      }
    })
  ],
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json'
    ]
  }
};

module.exports = config;
