let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css为单独的文件
let OptimizeCss = require('optimize-css-assets-webpack-plugin'); //压缩css optimize:优化
let UglifyjsPlugin= require('uglifyjs-webpack-plugin') //压缩js
let webpack = require('webpack');

module.exports = {
    optimization:{ // 优化项
        minimizer:[ // 添加属性后，原本压缩的js就没有压缩了。需要自己安装插件处理
            new OptimizeCss(), //压缩 css
            new UglifyjsPlugin({ // 压缩 JS
                cache:true, //是否清缓存
                parallel:true, //并发打包
                sourceMap:true // 源码映射
            })
        ]
    },
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
        }),
        new webpack.ProvidePlugin({ // 在每个模块里都注入$ 但是不是全局的 $
            $:'jquery'
        })
    ],
    externals:{ // 引入的不进行打包
        jquery:'$'
    },
    module:{ // 模块
        //loader：对原来的代码进行解析，功能单一
        //loader顺序：从右向左执行，从下到上
        // style-loader 他是把css插入到head的标签中
        // loader:用法可以写成字符串 数组 对象
        // 规则 css-loader : 解析 @import这种语法

        rules:[
        // {
        //     test:require.resolve('jquery'), 
        //     use:'expose-loader?$' // 把变量变为全局的变量
        // },

        // {
        //     test:/\.js$/,
        //     use:{
        //         loader:'eslint-loader', // 检测js规范
        //         options:{
        //             enforce:'pre' // 提前执行 previous
        //         }
        //     }
        // },
        {
            test:/\.html$/,
            use:'html-withimg-loader'
        },
        // {
        //     test:/\.(png|jpg|gif)$/,
        //     use:'file-loader'
        // },
        {
            test:/\.(png|jpg|gif)$/,
            // 做一个限制 当图片小于多少k的时候用base64来转化 可以减少请求
            // 否则用file-loader来产生真实的图片
            use:{
                loader:'url-loader',
                options:{
                    limit:200*1024
                }
            },
            
        },
        {
            test:/\.js$/,
            use:{
                loader:'babel-loader', // 把ES6转换成ES5
                options:{
                    presets:[
                        '@babel/preset-env'
                    ],
                    plugins:[
                        // '@babel/plugin-proposal-class-properties'
                        ["@babel/plugin-proposal-decorators",{"legacy":true}],
                        ["@babel/plugin-proposal-class-properties",{"loose":true}],
                        ["@babel/plugin-transform-runtime"]
                    ]
                }
            },
            include:path.resolve(__dirname,'src'), // 包含的文件
            exclude:/node_modules/ // 排除的文件
        },{
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