/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-12 17:18:50
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */


var server = require('./server').start,
	router = require('./router').route,
	requestHandler = require('./requestHandlers');
	// db = require('./db');

// db.dbConnect();

var config = {};
config['/'] = requestHandler.home;
config['/reg'] = requestHandler.reg;

server(router, config);