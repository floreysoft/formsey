const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    "formsey-core": './packages/formsey-core/index.ts',
    "formsey-fields-native": './packages/formsey-fields-native/index.ts',
    "formsey-fields-native-extended": './packages/formsey-fields-native-extended/index.ts',
    "formsey-fields-material": './packages/formsey-fields-material/index.ts',
    "formsey-fields-vaadin": './packages/formsey-fields-vaadin/index.ts'
  },
  // mode: 'development',
  // devtool: 'cheap-module-source-map',
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ts?$/,
        use: ["babel-loader", 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(js)$/,
        use: ["babel-loader"],
        exclude: {
          test: path.resolve(__dirname, "node_modules/localforage")
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: "./packages/[name]/umd/[name].min.js"
  }
};