const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ErrorOverlayWebpackPlugin = require( 'error-overlay-webpack-plugin' );

const ip = require( 'ip' ).address();
const serverPort = 8081;

module.exports = {
    entry: path.resolve( __dirname, 'src/index.js' ),
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'index.[hash].js',
        publicPath: 'http://' + ip + ':' + serverPort + '/'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [ {
            test: /\.(?:jsx?)$/,
            exclude: /node_modules/,
            use: [ 'babel-loader', 'eslint-loader' ]
        }, {
            test: /\.(?:sass|scss|css)$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }, {
            test: /\.(woff2?|ttf|eot|svg|jpg)$/,
            use: [ {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/'
                }
            } ]
        } ]
    },
    devServer: {
        open: true,
        port: serverPort,
        hot: true,
        host: ip,
        historyApiFallback: true,
        clientLogLevel: 'silent'
    },
    plugins: [
        new HTMLWebpackPlugin( {
            template: path.resolve( __dirname, 'src/index.html' ),
            favicon: path.resolve( __dirname, 'src/favicon.ico' )
        } ),
        new CleanWebpackPlugin( {
            cleanOnceBeforeBuildPatterns: [ '**/*' ]
        } ),
        new ErrorOverlayWebpackPlugin()
    ]
};
