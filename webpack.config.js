module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /(node_modules)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['babel-preset-env']
  //         }
  //       }
  //     }
  //   ]
  // }
}
