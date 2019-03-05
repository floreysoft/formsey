
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'source-map-support'],
    files: [
          'packages/**/test/*.spec.ts'
      ],
      preprocessors: {
          '**/*.ts': ['webpack', 'sourcemap']
      },
      reporters: ['mocha', 'coverage-istanbul'],

      // browsers: ['ChromeHeadlessNoSandbox'],
      browsers: ['Chrome'],

      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },

      mochaReporter: {
        showDiff: true,
      },

      colors: true,

      // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
      logLevel: config.LOG_INFO,

      // ## code coverage config
      coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text-summary'],
        dir: 'coverage',
        combineBrowserReports: true,
        skipFilesWithNoCoverage: true,
        thresholds: {
          global: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
          },
        },
      },

      webpack: {
        devtool: 'inline-source-map',
        mode: 'development',
        resolve: {
          extensions: ['.js', '.ts']
      },
        module: {
          rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-element|lit-html|@polymer|@vaadin|@lit)\/).*/
            },
            {
              test: /\.ts?$/,
              use: ['babel-loader', 'ts-loader'],
              exclude: /node_modules/
            }
          ]
        }
      },

      autoWatch: false,
      singleRun: true,
      concurrency: Infinity
      });
};