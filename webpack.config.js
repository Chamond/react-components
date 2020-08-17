const path = require( 'path' );

const DEVELOPMENT = process.env.NODE_ENV === 'development';

console.log( 'mode: ' + process.env.NODE_ENV );

const config = require( DEVELOPMENT ? './webpack.config.development' : './webpack.config.production' );

config.resolve = {
    extensions: [ '.js', '.jsx', '.css', '.scss', '.sass', '.json' ],
    alias: {
        '@hooks': path.resolve( __dirname, 'src/hooks' ),
        '@components': path.resolve( __dirname, 'src/lib' ),
        '@constants': path.resolve( __dirname, 'src/lib/constants' ),
        '@assets': path.resolve( __dirname, 'src/assets' )
    }
};

module.exports = config;
