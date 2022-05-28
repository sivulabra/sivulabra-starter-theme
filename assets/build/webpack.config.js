const path = require('path')
const config = require('./config')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = (env, argv) => ({
  entry: {
    'scripts/main': path.resolve(__dirname, '../src/scripts/main.js'),
    'styles/main': path.resolve(__dirname, '../src/styles/main.scss'),
  },
  output: {
    path: path.resolve(__dirname, config.paths.dist.root),
    filename: '[name].[hash].js',
    clean: true
  },
  resolve: {
    modules: ['node_modules']
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, config.paths.src.scripts),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, 'babel.config.js')
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, config.paths.src.styles),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      filename: 'main.css'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new BrowserSyncPlugin({
      host: config.urls.devHost,
      port: config.urls.devPort,
      proxy: config.urls.devUrl
    }),
    new WebpackManifestPlugin({
      filename: 'manifest.json',
      filter: (file) => !file.path.match(/\.svg|png|jpg|woff|woff2|gitkeep|js.LICENSE.txt|js.LICENSE$/),
      publicPath: ''
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxInitialRequests: Infinity,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `package/npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  watch: argv.mode !== 'production',
  watchOptions: {
    ignored: ['node_modules']
  }
})