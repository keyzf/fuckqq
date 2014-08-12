//file system moudle
// var fs   = require('fs');
// //path moudle
// var path = require('path');
// var querystring = require('querystring');
// var mime = require('./mime').types;
// var db = require('./db').db;



// function handle(pathname, config, request, response) {
// 	// console.log(request.method);
// 	if (request.method == 'GET') {
// 		if (pathname == '/') {
// 			var realPath = 'index.html'
// 		} else {
// 			var realPath = 'views' + pathname;
// 		}

// 		fs.exists(realPath, function (exists) {
// 			if (!exists) {
// 				response.writeHead(404, {'Content-Type' : 'text/plain'});
// 				response.write('404 not found!');
// 				response.end();
// 			} else {
// 				fs.readFile(realPath, 'binary', function (err, file) {
// 					if (err) {
// 						response.writeHead(500, {'Content-Type' : 'text/plain'});
// 						response.end(err);
// 					} else {
// 						//get the extname of the file
// 						var ext = path.extname(realPath);
// 						//get rid of '.'
// 						ext = ext ? ext.slice(1) : 'unknow';
// 						var contentType = mime[ext] || 'text/plain';

// 						response.writeHead(200, {'Content-Type' : contentType});
// 						response.write(file, 'binary');
// 						response.end();
// 					}
// 				})
// 			}
// 		});
// 	} else if (request.method == 'POST') {
// 		console.log(request.url);
// 		request.setEncoding("utf8");
// 		var buffers = [];
// 		request.on('data', function (trunk) {
// 			buffers.push(trunk);
// 		}).on('end', function () {
// 			console.log(buffers);
// 			request.rawBody = Buffer.concat(buffers).toString();

// 			if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
// 				request.body = querystring.parse(request.rawBody);
// 			}
// 			// console.log(request.body);
// 			var name = request.body.name;
// 			var password = request.body.password;

// 			//create the user collection
// 			db.createCollection('user', {safe : true}, function (error) {
// 				if (error) {
// 					console.log(error);
// 				} else {
// 					var user = db.collection('user');
// 					//insert the data
// 					user.insert({name : name, password : password}, {safe : true}, function (err, result) {
// 						console.log(result);
// 					})
// 				}
// 			});

// 			response.writeHead(200, {'Content-Type' : 'text/plain'});
// 			response.write('name is ' + name + 'pwd is' + password);
// 			response.end();
// 		});
// 	} 

// }


var fs = require('fs'),
	path = require('path'),
	qs = require('querystring'),
	// third-party package
	jade = require('jade'),
	debug = require('debug')('requesthandlers'),
	// local module
	mime = require('./mime').types;
	// db = require('./db').db;


var home = function (request, response) {
	debug('request home page');
	var jadeFn = jade.compileFile('views/index.jade', {});
	var str = jadeFn({title: 'home page', baseUrl: 'localhost:8888'});
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
	var jadeFn = jade.compileFile('views/reg.jade', {});
	var str = jadeFn({title: 'reg page', baseUrl: 'localhost:8888'});
	response.writeHead(500, {'Content-Type': 'text/html'});
	response.write(str);
	response.end();

	// reg = function (request, response) {
	// 	debug('renderer page in cache');
	// 	var str = jadeFn({title: 'cache reg page', baseUrl: 'localhost:8888'});
	// 	response.writeHead(500, {'Content-Type': 'text/html'});
	// 	response.write(str);
	// 	response.end();
	// };
};
exports.home = home;
exports.reg = reg;
// exports.handle = handle;