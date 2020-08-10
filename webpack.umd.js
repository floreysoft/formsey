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
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  experiments: {
    outputModule: true
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  /*
  externals: {
    "lit-html": {
      commonjs: 'lit-html',
      root: 'html'
    }
  },
  */
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [ {
          loader: 'minify-lit-html-loader',
          options: {
            htmlMinifier: {
              ignoreCustomFragments: [
                /<\s/,
                /<=/
              ]
            }
          }
        }, 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(js)$/,
        use: [{
          loader: 'minify-lit-html-loader',
          options: {
            htmlMinifier: {
              ignoreCustomFragments: [
                /<\s/,
                /<=/
              ]
            }
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: "./packages/[name]/umd/[name].min.js"
  }
};