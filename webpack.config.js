const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');


module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                             'css-loader', 
                             'postcss-loader'
                 ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)$/i,
            use: [
                
                 {
                    loader: 'file-loader',
                    options: {
                        name: './images/[name].[ext]',
                        esModule: false
                    }
                 },
                 {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                        progressive: true,
                        quality: 65,
                        },
                        optipng: {
                        enabled: false,
                        },
                        gifsicle: {
                        interlaced: false,
                        },
                        pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4,
                        }
                    }
                 }
                 ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        }
        ]
      },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}