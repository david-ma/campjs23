// path
module.exports = {
  mode: 'development',
  entry: './src/js/index.ts',
  output: {
    path: __dirname + '/dist/js',
    filename: 'rapier.js',
  },
  // resolve: {
  //   // mainFields: ['browser', 'module'],
  //   mainFields: ['module', 'browser', 'main'],
  // },
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
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
