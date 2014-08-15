/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-12 17:18:50
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */


// var server = require('./server').start,
// 	router = require('./router').route,
// 	requestHandler = require('./requestHandlers'),
// 	cfg = require('./config'),
// 	models = require('./models');

// var config = {};
// config['/'] = requestHandler.home;
// config['/reg'] = requestHandler.reg;

// server(router, config);




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
	match = app.match;

app.get('/', requestHandlers.home);

app.get('/reg', requestHandlers.reg);
app.post('/reg', requestHandlers.regPost);

app.post('/reg/:username', function (req, res) {

});



var handle404 = function (req, res) {

	return false;
};

// exports.start = function (route, config) {
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
	}
	// 处理路由
	var method = req.method.toLowerCase();

	if (routes.hasOwnProperty(method) && match(pathname, routes[method], req, res) ||
			match(pathname, routes.all, req, res)) {
		return;
	}

	// if (routes.hasOwnProperty(method)) {
	// 	if (match(pathname, routes[method])) {
	// 		// 根据请求方法分支
	// 		return;
	// 	}
	// 	else {
	// 		// 如果路径没有匹配成功，尝试让all()来处理
	// 		if (match(pathname, routes.all)) {
	// 			return;
	// 		}
	// 	}
	// }
	// else {
	// 	// 直接让all()来处理
	// 	if (match(pathname, routes.all)) {
	// 		return;
	// 	}
	// }

	handle404(req, res);
}).listen(port);

debug('server start: %d', port);
// };











