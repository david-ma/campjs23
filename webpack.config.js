// path
module.exports = {
  mode: 'development',
  entry: './src/js/index.ts',
  output: {
    path: __dirname + '/dist/js',
    filename: 'index.js',
  },
  resolve: {
    mainFields: ['module'],
    extensions: ['.ts', '.js'],
    // mainFields: ['browser', 'module'],
    // mainFields: ['module', 'browser', 'main'],
  },
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.m?ts$|\.tsx?$/,
        // exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
          },
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
}
