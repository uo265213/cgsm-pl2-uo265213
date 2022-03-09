module.exports = {
    module: {
        rules: [
          {
            test: /\.glsl$/,
            use: {
              loader: 'webpack-glsl-loader'
            }
          }
        ]
      }
    ,
    mode: "development",
    entry: {
        "prac5-1": './src/prac5-1.js',
        "prac5-2": './src/prac5-2.js'

        
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: __dirname
        },
        devMiddleware: {
            writeToDisk: true
        }
    },
    performance: {
        maxAssetSize: 2000000,
        maxEntrypointSize: 2000000
    }
};