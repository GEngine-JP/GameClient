文章来源：http://www.infoq.com/cn/articles/react-and-webpack
使用webpack       code splitting(自动完成) 和loader(处理各类静态资源)
npm install -g webpack

之后便有了全局的webpack命令，直接执行此命令会默认使用当前目录的webpack.config.js作为配置文件。如果要指定另外的配置文件，可以执行
webpack —config webpack.custom.config.js

Webpack开发服务器需要单独安装，同样是通过npm进行：
npm install -g webpack-dev-server

Webpack模块加载器（Loaders）
npm install jsx-loader --save

React开发神器：react-hot-loader
要使用react-hot-loader，首先通过npm进行安装：
npm install react-hot-loader —save

服务器
npm install webpack-dev-server --save


