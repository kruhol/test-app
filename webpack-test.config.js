const path = require('path');
const sourcePath = path.join(__dirname, './src');

/**
 * Webpack Plugins
 */
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
  context: sourcePath,
//   mode: 'development',
  devtool: 'inline-source-map',

  plugins: [
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          configuration: require('./tslint.json'),
          typeCheck: true,
        },
      },
    }),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'tslint-loader',
          options: {
            emitErrors: true,
          },
        },
        enforce: 'pre',
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/,
          /\.spec\.ts$/,
        ],
        use: 'istanbul-instrumenter-loader',
        enforce: 'post',
      },
    ],
  },

  devServer: {},
};
