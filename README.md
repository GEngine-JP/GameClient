#npm run dev 启动服务器  并自动刷新浏览器

文章来源：http://www.infoq.com/cn/articles/react-and-webpack
使用webpack       code splitting(自动完成) 和loader(处理各类静态资源)
npm install -g webpack

webpack命令
webpack 执行一次开发时的编译
webpack -p 执行一次生成环境的编译（压缩）
webpack --watch 在开发时持续监控增量编译（很快）
webpack -d 让他生成SourceMaps
webpack --progress 显示编译进度
webpack --colors 显示静态资源的颜色
webpack --sort-modules-by, --sort-chunks-by, --sort-assets-by 将modules/chunks/assets进行列表排序
webpack --display-chunks 展示编译后的分块
webpack --display-reasons 显示更多引用模块原因
webpack --display-error-details 显示更多报错信息


之后便有了全局的webpack命令，直接执行此命令会默认使用当前目录的webpack.config.js作为配置文件。如果要指定另外的配置文件，可以执行
webpack —config webpack.custom.config.js

Webpack开发服务器需要单独安装，同样是通过npm进行：
npm install -g webpack-dev-server

编译
webpack --display-error-details

Webpack模块加载器（Loaders）
npm install jsx-loader --save

React开发神器：react-hot-loader
要使用react-hot-loader，首先通过npm进行安装：
npm install react-hot-loader —save

服务器
npm install webpack-dev-server --save

启动方式
webpack-dev-server --hot --quiet

监控文件变化自动编译

https://undefinedblog.com/react-router-0-13-3/ 路由