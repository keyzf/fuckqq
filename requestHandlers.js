//file system moudle
var fs   = require('fs');
//path moudle
var path = require('path');
var querystring = require('querystring');
var mime = require('./mime').types;
var db = require('./db').db;


function handle(pathname, request, response) {
	// console.log(request.method);
	if (request.method == 'GET') {
		if (pathname == '/') {
			var realPath = 'index.html'
		} else {
			var realPath = 'views' + pathname;
		}

		fs.exists(realPath, function (exists) {
			if (!exists) {
				response.writeHead(404, {'Content-Type' : 'text/plain'});
				response.write('404 not found!');
				response.end();
			} else {
				fs.readFile(realPath, 'binary', function (err, file) {
					if (err) {
						response.writeHead(500, {'Content-Type' : 'text/plain'});
						response.end(err);
					} else {
						//get the extname of the file
						var ext = path.extname(realPath);
						//get rid of '.'
						ext = ext ? ext.slice(1) : 'unknow';
						var contentType = mime[ext] || 'text/plain';

						response.writeHead(200, {'Content-Type' : contentType});
						response.write(file, 'binary');
						response.end();
					}
				})
			}
		});
	} else if (request.method == 'POST') {
		console.log(request.url);
		request.setEncoding("utf8");
		var buffers = [];
		request.on('data', function (trunk) {
			buffers.push(trunk);
		}).on('end', function () {
			console.log(buffers);
			request.rawBody = Buffer.concat(buffers).toString();

			if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
				request.body = querystring.parse(request.rawBody);
			}
			// console.log(request.body);
			var name = request.body.name;
			var password = request.body.password;

			//create the user collection
			db.createCollection('user', {safe : true}, function (error) {
				if (error) {
					console.log(error);
				} else {
					var user = db.collection('user');
					//insert the data
					user.insert({name : name, password : password}, {safe : true}, function (err, result) {
						console.log(result);
					})
				}
			});

			response.writeHead(200, {'Content-Type' : 'text/plain'});
			response.write('name is ' + name + 'pwd is' + password);
			response.end();
		});
	} 

}


exports.handle = handle;