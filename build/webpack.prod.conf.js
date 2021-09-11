// 引入webpack-merge插件用来合并webpack配置对象，也就是说可以把webpack配置文件拆分成几个小的模块，然后合并
var merge = require('webpack-merge')
// 引入当前目录下的webpack.base.conf.js配置文件，主要配置的是打包各种文件类型的配置

var baseWebpackConfig = require('./webpack.base.conf')

var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(baseWebpackConfig, {

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'static/favicon.ico',
            inject: true
        }),
    ]
})