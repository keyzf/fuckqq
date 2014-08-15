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
  // 第三方package
  debug = require('debug')('server'),
  // 本地module
  cfg = require('./config');



exports.start = function (route, config) {
	var port = cfg.port;

	http.createServer(function (request, response) {
		var pathname = url.parse(request.url).pathname;

		route(pathname, config, request, response);
	}).listen(port);

	debug('server start: %d', port);
};