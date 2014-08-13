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
	qs = require('querystring'),
	// third-party package
	jade = require('jade'),
	debug = require('debug')('requesthandlers'),
	// local module
	mime = require('./mime').types,
	User = require('./models').User,
	cfg = require('./config');
	// db = require('./db').db;

var home = function (request, response) {
	debug('request home page');
	var jadeFn = jade.compileFile('views/index.jade', {});
	var str = jadeFn({title: 'home page'});
	response.writeHead(500, {'Content-Type': 'text/html'});
	response.write(str);
	response.end();

	// 我想实现模版编译缓存
	// home = function (request, response) {
	// 	debug('renderer home page in cache');
	// 	var str = jadeFn({title: ' cache home page', baseUrl: 'localhost:8888'});
	// 	response.writeHead(500, {'Content-Type': 'text/html'});
	// 	response.write(str);
	// 	response.end();
	// };
};


var reg = function (request, response) {
	debug('request reg page');

	if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
		var buffers = [];
		request.on('data', function (truck) {
			buffers.push(truck);
		}).on('end', function () {
			debug(buffers);

			request.rawBody = Buffer.concat(buffers).toString();
			request.body = qs.parse(request.rawBody);

			var alias = request.body.name,
				pass = request.body.pass,
				re_pass = request.body.re_pass,
				email = request.body.email;

			User.find({'$or': [
				{'alias': alias},
				{'email': email}
			]}, function (err, users) {
				if (err) {
					debug('注册失败', err);
					var jadeFn = jade.compileFile('views/reg.jade', {});
					var str = jadeFn({title: '信息错误，请重新注册'});
					response.writeHead(500, {'Content-Type': 'text/html'});
					response.write(str);
					response.end();
				}

				if (users.length > 0) {
					debug('用户名或邮箱已被注册');
					var jadeFn = jade.compileFile('views/reg.jade', {});
					var str = jadeFn({title: '用户名或邮箱已被注册'});
					response.writeHead(500, {'Content-Type': 'text/html'});
					response.write(str);
					response.end();
				}

				var user = new User();

				user.alias = alias;
				user.pass = pass;
				user.email = email;
				user.save(function (err) {
					if (err) { 
						debug('用户信息保存失败')
						// TODO
					}

					debug('注册成功')
					var jadeFn = jade.compileFile('views/index.jade', {});
					var str = jadeFn({title: 'home page - 注册成功'});
					response.writeHead(500, {'Content-Type': 'text/html'});
					response.write(str);
					response.end();
				});
			});
		});



	}
	else {

		var jadeFn = jade.compileFile('views/reg.jade', {});
		var str = jadeFn({title: 'reg page'});
		response.writeHead(500, {'Content-Type': 'text/html'});
		response.write(str);
		response.end();
	}
};
exports.home = home;
exports.reg = reg;
// exports.handle = handle;