import * as webpack from 'webpack';
import * as path from 'path';

const config: webpack.Configuration = {
  target: 'electron-main',
  entry: {
    main: './main.ts'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
