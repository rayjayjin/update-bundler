const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
  entry: [path.resolve(__dirname, './src/client.tsx')],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    clean: true,
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     babelrc: false,
          //     configFile: path.resolve(__dirname, '.babelrc.json'),
          //   },
          // },
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          // {
          //   loader: 'style-loader',
          // },
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.png$/,
        // type: 'asset/resource',
        type: 'asset',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname), './node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
    alias: {
      '/images': path.resolve(__dirname, './public/images'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/default.html'),
      filename: 'default.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ]
};

module.exports = function(env, argv) {
  const isDev = env && env.development;
  const isProd = env && env.production;

  if (isDev) {
    return merge(baseConfig, {
      mode: 'development',
      devtool: 'eval',
      devServer: {
        port: '3333',
        contentBase: path.resolve(__dirname, './public'),
        // publicPath: '/',
        index: 'default.html',
        hot: true,
      },
    })
  }

  if (isProd) {
    return merge(baseConfig, {
      mode: 'production',
    })
  }

  return baseConfig;
};