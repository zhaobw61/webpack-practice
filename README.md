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

- module:加载loader。对代码进行解析，功能单一，例如ES6、LESS的转换。
