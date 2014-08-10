var requestHandles = require('./requestHandlers');

function route (pathname, request, response) {

	requestHandles.handle(pathname, request, response);

}

exports.route = route;
