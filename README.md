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



&copy;xiaohuame — All Rights Reserved.




