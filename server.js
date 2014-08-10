var http = require('http');
var url  = require('url');

function start (route) {

	function onRequest (request, response) {
    	var pathname = url.parse(request.url).pathname;

   		route(pathname, request, response);
  	}

  	http.createServer(onRequest).listen(8888);
  	console.log('server start!');
}

exports.start = start;