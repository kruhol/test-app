const webpack = require("webpack");

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['src/**/*.spec.ts'],
        mime: { 'text/x-typescript': ['ts','tsx'] },
        preprocessors: {
            'src/**/*.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            resolve: {
                extensions: ['.js', '.ts', '.tsx']
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        exclude: /node_modules/
                    },
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
                                loader: 'css-loader'
                            }
                        ]
                    }
                ]
            },
            stats: {
                colors: true,
                modules: true,
                reasons: true,
                errorDetails: true
            },
            plugins: [
                new webpack.SourceMapDevToolPlugin({
                    filename: null,
                    test: /\.(ts|js)($|\?)/i,
                    exclude: [ /node_modules/ ]
                })
            ]
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    });
};
