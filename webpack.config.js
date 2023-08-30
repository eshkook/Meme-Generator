const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Loader for images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // Loaders for CSS
      {
        test: /\.css$/,
        
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    }
  }
};
