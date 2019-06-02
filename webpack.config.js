const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

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
            })
        ],
        devServer: {
            contentBase: path.resolve(__dirname),
            inline: true,
            port: 5000
        },
        devtool: "source-map"
    };
};
