import path from 'path'

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public'
  },
  node: {
    fs: 'empty'
  }
}
