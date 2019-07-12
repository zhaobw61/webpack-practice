# webpack-practice
webpack练习项目

 每次都是用别人搭建好的webpack来进行开发。当然自己已经早就想试一试这个磨人的小妖精。江湖已有传闻 Vue不难，难得是配置webpack。

 wenpack的配置主要都在webpack.config.js里面有详细的注释。

# webpack.config.js的构成

> webapck.config.js 文件里详细的介绍，这里只是大致的说明webpack几个组成和它们分别的功能。

- devServer：开发服务器的配置。可以配置端口等

- mode：选择webpack的模式

- entry：如果文件

- output:对js文件打包的要求。

- plugins：加载一些特殊功能的插件，来帮你处理文件，例如：压缩html、抽离css为一个单独的文件

- module:加载loader。对代码进行解析，功能单一，例如ES6、LESS的转换。loader顺序：从右向左执行 从下到上。

> loader有4个类型：前置、普通、内联：把loader配置到代码里、后置

- optimization：优化项，优化代码。例如压缩

# 常用插件和loader：
### HTML

- removeAttributeQuotes：去掉双引号。

- collapseWhitespace：压缩HTML

### CSS 

- MiniCssExtractPlugin：抽离css为单独的文件。

```
// 在plugin里声明，然后在module里调用
plugins:[
    new MiniCssExtractPlugin({
        filename:'main.css' // 打包后文件的名字
    })
]
module:{
    rules:[{
        test:/\.css$/,
        use:[
            MiniCssExtractPlugin.loader
        ]
    }]
}
```
----

- css-loader：解析css

----

- postcss-loader：给css加前缀

>需要配置一个postcss.config.js

```
//postcss.config.js
module.exports = {
    plugins:[require('autoprefixer')]
}
```

#### postcss-loader要用在css-loader前面

----

- less-loader：处理less

----

- optimize-css-assets-webpack-plugin：压缩css 用在 optimization

### JS

- UglifyjsPlugin：压缩JS

```
new UglifyjsPlugin({
    cache:true, //是否清缓存
    parallel:true, //并发打包
    sourceMap:true // 源码映射
})
```

- babel: 把高级的JS转换为低级的JS

- eslint-loader：校验JS是否规范

- expose-loader：把引入的模块暴露到window上

> 举例：如果需要在window上挂载到window上。
- (1)用expose-loader

```
{
    test:require.resolve('jquery'), 
    use:'expose-loader?$'
},
```

- (2)ProvidePlugin：给每个页面提供一个$

```
new webpack.ProvidePlugin({ 
    $:'jquery'
})
```

- (3)引入不打包

```
externals:{
    jquery:'$'
},
```

