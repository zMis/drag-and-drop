module.exports = {
     entry: './src/index.js',
     output: {
         path: './js',
         filename: 'bundle.js'
     },
     loaders: [
        {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
    ]
 };