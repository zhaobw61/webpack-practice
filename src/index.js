// let str = require('./a.js');

// console.log(str);

// require('./index.css');
// require('./index.less');

// let fn = () => {
//     console.log('asd');
// }
// fn();
// import $ from 'expose-loader?$!jquery'

// webpack打包图片 :file-loader:会生成一张图片到build目录下。 把生成的图片的名字返回回来
// 1) 在js中穿件图片来引入
import logo from './logo.jpg';
let  image = new Image();
image.src = logo;
document.body.appendChild(image);
// 2) 在css引入background('url')
// 可以直接引入
// 3) <img src="", alt=""> html-withimg-loader
