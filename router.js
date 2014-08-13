
/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-12 17:18:50
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

var fs = require('fs'),
	path = require('path'),
	url = require('url'),
	// third-party package
	debug = require('debug')('router'),
	// local module
	mime = require('./mime').types,
	cfg = require('./config');

var getFile = function (path, mimetype, res) {
	fs.readFile(path, function (err, contents) {
		if (err) {
			res.writeHead(500);
			res.end();
		}
		else {
			res.writeHead(200, {
				'Content-Type': mimetype,
				'Content-length': contents.length
			});
			res.end(contents);
		}
	});
};

exports.route = function (pathname, config, request, response) {
	debug('routes to: %s', pathname);

	// 如果有配置路由，则直接调用相关路由
	if (typeof(config[pathname]) === 'function') {
		return config[pathname](request, response);
	}
	else { // 如果是未配置的路径
		var filename = path.basename(request.url),
			ext = path.extname(filename),
			localpath = __dirname + pathname;

		// 如果是静态文件，这里还需要完善，TODO
		if (mime[ext]) {
			fs.exists(localpath, function (exists) {
				if (exists) {
					getFile(localpath, mime[ext], response);
				}
				else {
					response.writeHead(404);
					response.end('');
				}
			});
		}
		else { // 如果也不是静态文件，则现实404页面 TODO

			debug('routes to empty path: %s', pathname);
		}
	}
};
