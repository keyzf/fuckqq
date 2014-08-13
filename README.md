#fuckqq

-----


基于[node.js](http://nodejs.org/api/) 和 [mongodb](http://api.mongodb.org/js/2.7.4/)的web聊天系统






基本功能：
* 用户注册/登录
* 添加好友
* 实时聊天
* ...

## install

### development

`DEBUG=* supervisor index.js`

### production

`node index.js`



## third-party package list

* supervisor
	更改代码后，自动重启服务，使用方法自行去npmjs.org找

* mongoose － Mongoose MongoDB ODM
	Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
	参考[mongoose api](http://mongoosejs.com/docs/api.html)

* debug
	这个是用来再终端打印log的package，使用方法很简单，参考[npm debug](https://www.npmjs.org/package/debug)

* jade
	html模版引擎，使用也很简单，参考[jade api](http://jade-lang.com/api/)

## 用gulp来作为构建工具（拟）

* gulp

* gulp-less

* browser-sync


2014/8/14 9:14 提交日志

* 前端界面加入了bootstrap 3.2.0以及jquery－2.1.1依赖，前端界面采用bootstrap进行布局
* 服务端又加入了utility 1.0.0依赖
* 实现了静态文件的路由处理（初级，不严密，无验证，不完善）
* 实现了注册，保存用户信息
* 接下去还需要添加session和cookie功能，用来保存用户的登录状态。


&copy;xiaohuame — All Rights Reserved.




