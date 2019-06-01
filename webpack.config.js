const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let isProdBuild = process.env.NODE_ENV === 'production';

module.exports = () => {
    return {
        entry: {
            app: path.resolve(__dirname, 'src')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/app.js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                        loader: 'css-loader',
                        options: {
                            minify: isProdBuild
                        }
                        }
                    ]
                },
                // {
                //     test: /\.css$/,
                //     use: 'style-loader'
                // },
                // {
                //     test: /\.scss$/,
                //     use: ExtractTextWebpackPlugin.extract({
                //         fallback: 'style-loader',
                //         use: [
                //             {
                //                 loader: 'css-loader',
                //                 options: {
                //                     sourceMap: true
                //                 }
                //             },
                //             {
                //                 loader: 'sass-loader',
                //                 options: {
                //                     sourceMap: true
                //                 }
                //             }
                //         ]
                //     })
                // },
                // {
                //     test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                //     use: 'url-loader?limit=100000'
                // },
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                    enforce: 'pre'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader'
                },
                {
                    test: /\.tsx?$/,
                    loaders: ['babel-loader', 'awesome-typescript-loader'],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx']
        },
        plugins: [
            new ExtractTextWebpackPlugin('[name].css'),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'window.jquery': 'jquery'
            }),
            new CleanWebpackPlugin(['dist'], {
                root: path.resolve(__dirname),
                verbose: true
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                hash: true,
                chunks: ['app']
            }),
            // new CopyWebpackPlugin([
            //     {from: 'assets/img', to: 'assets/img'},
            //     {from: 'assets/fonts', to: 'assets/fonts'}
            // ])
        ],
        devServer: {
            contentBase: path.resolve(__dirname),
            inline: true,
            port: 5000
        },
        devtool: "source-map"
    };
};

// Todo: add minification for js output file
// Todo: add minification for css output file
// Todo: add minification for html output file
// Todo: add hashing and cashing of chunks
// Todo: modularize webpack config file

// // fail if API_HOST is not set
// dotenv.config({ silent: false });

// let proxyAgent = !!process.env.http_proxy ? new HttpsProxyAgent(process.env.http_proxy) : null;
// let apiHost = process.env.API_HOST;
// let isProdBuild = process.env.NODE_ENV === 'production';

// const srcDir = './src',
//       outDir = './dist';

// let webpackConfig = {
//   entry: path.join(path.resolve(srcDir), 'app.js'),
//   output: {
//     path: path.resolve(outDir),
//     filename: 'js/app.js',
//     publicPath: '/'
    
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//          {
//             loader: 'css-loader',
//             options: {
//               minify: isProdBuild
//             }
//           }
//         ]
//       },
//       {
//         test: /\.(html|png|gif|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//         exclude: /index\.html/,
//         loader: 'file-loader',
//         options: {
//           name: '[path][name].[ext]',
//           context: 'src'
//         }
//       },
//       {
//         test: /index\.html/,
//         loader: 'file-loader',
//         options: {
//           name: 'index.html'
//         }
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(outDir),
//     new webpack.ProvidePlugin({
//       $: "jquery",
//       jQuery: "jquery",
//       "window.jQuery": "jquery",
//       Popper: ['popper.js', 'default']
//     })
//   ],
//   devtool: isProdBuild ? 'source-map' : '#inline-source-map',
//   devServer: {
//     port: 4200,
//     proxy: {
//       "/api": {
//         target: `http://${apiHost}`,
//         changeOrigin: true,
//         pathRewrite: { "^/api": "" },
//         agent: proxyAgent
//       }
//     }
//   }
// }

// if ( isProdBuild ) {
//   webpackConfig.plugins.push(
//     new UglifyJsPlugin({
//       sourceMap: true
//     })
//   )
// }

// module.exports = webpackConfig
