module.exports = {
    mode: "production",
    entry: {
        "prac2-1": './src/prac2-1.js',
        "prac2-2": './src/prac2-2.js',
        "prac2-3": './src/prac2-3.js',
        "prac2-4": './src/prac2-4.js',
        "prac2-5": './src/prac2-5.js',
        "prac2-6": './src/prac2-6.js',
        "prac2-7": './src/prac2-7.js'
        
    },
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