const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'src/public'),
    filename: 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/, // matches files like *.worker.js
        use: { 
          loader: 'worker-loader'
        }
      }
    ]
  }
}