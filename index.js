/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-12 17:18:50
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */


var http = require('http'),
  url  = require('url'),
  fs = require('fs'),
  path = require('path'),
  // 第三方package
  debug = require('debug')('index'),
  // jade = require('jade'),
  // 本地module
  cfg = require('./config'),
  app = require('./routes'),
  requestHandlers = require('./requestHandlers');

var routes = app.routes,
	match = app.match,
	handle = app.handle;

app.get('/', requestHandlers.home);

app.get('/reg', requestHandlers.reg);
app.post('/reg', requestHandlers.regPost);

app.post('/reg/:username', function (req, res) {

});



var handle404 = function (req, res) {

	debug('%s 404', req.url);
	// res.end('404 error');

};

var port = cfg.port;

http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	// 设置静态目录
	if (pathname.search('/public') === 0) {
		fs.readFile(path.join(__dirname, pathname), function (err, file) {
			if (err) {
				res.writeHead(500);
				res.end();
			}
			else {
				res.writeHead(200, {
					// 'Content-Type': mimetype,
					'Content-length': file.length
				});
				res.end(file);
			}
		});
		return;
	}
	// 处理路由
	var method = req.method.toLowerCase();

	var stacks = match(pathname, routes.all, req, res);
	if (routes.hasOwnProperty(method)) {
		// 根据请求方法奋发，获取相关的中间件
		stacks = stacks.concat(match(pathname, routes[method], req, res));
	}

	if (stacks.length) {
		handle(req, res, stacks);
	}
	else {
		// do somthing for 404 error
		handle404(req, res);
	}
}).listen(port);

debug('server start: %d', port);











