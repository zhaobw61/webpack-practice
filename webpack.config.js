let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css为单独的文件
module.exports = {
    devServer:{ // 开发服务器的配置
        port:3000,
        progress:true,
        contentBase:'./dist',
        compress:true
    },
    mode:'production',// 模式 默认模式 production development
    entry:'./src/index.js',//入口
    output:{
        filename:'bundle.[hash:8].js',//打包后的文件名 [hash:8] hash只有8位
        path:path.resolve(__dirname,'dist'),//路径必须是一个绝对路径
    },
    plugins:[ // 数组 放着所有逇webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:true, // 去掉双引号
                collapseWhitespace:true, // 压缩html
            },
            hash:true //给js添加一个hash值
        }),
        // 抽离css
        new MiniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    module:{ // 模块
        //loader：对原来的代码进行解析，功能单一
        //loader顺序：从右向左执行
        // style-loader 他是把css插入到head的标签中
        // loader:用法可以写成字符串 数组 对象
        // 规则 css-loader : 解析 @import这种语法
        rules:[{
            test:/\.css$/,
            use:[
                //决定css放的位置
                // {
                //     loader:'style-loader',
                //     options:{
                //         // 样式插入的位置
                //         insertAt:'top'
                //     }
                // },
                // 抽离css为单独的文件
                MiniCssExtractPlugin.loader,
                'css-loader',
                // 添加css前缀
                'postcss-loader'
            ]
        },{
            test:/\.less$/,
            use:[
                // {
                //     loader:'style-loader',
                //     options:{
                //         // 样式插入的位置
                //         insertAt:'top' 
                //     }
                // },
                // 抽离css为单独的文件
                MiniCssExtractPlugin.loader,
                //解决css引用关系
                'css-loader',
                // 添加css前缀
                'postcss-loader',
                'less-loader' //把less 转为 css
            ]
        }]
    }
}