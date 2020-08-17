const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = {
    entry: './src/lib/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: '@chamond/react-components'
    },
    externals: {
        react: 'react'
    },
    optimization: {
        // splitChunks: {
        //     chunks: 'all'
        // },
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    module: {
        rules: [ {
            test: /\.(?:jsx?)$/,
            exclude: /node_modules/,
            use: [ 'babel-loader' ]
        }, {
            test: /\.(?:sass|scss|css)$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }, {
            test: /\.(woff2?|ttf|eot|svg|jpg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/'
                    }
                }
            ]
        } ]
    },
    plugins: [
        new CleanWebpackPlugin( {
            cleanOnceBeforeBuildPatterns: [ '**/*' ]
        } ),
        new MiniCssExtractPlugin( {
            filename: '[name].[contenthash].css'
        } )
    ]
};
