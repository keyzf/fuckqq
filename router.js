
/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-12 17:18:50
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

var debug = require('debug')('router');


exports.route = function (pathname, config, request, response) {
	debug('routes to: '+ pathname);

	if (typeof(config[pathname]) === 'function') {
		return config[pathname](request, response);
	}
	else {
		debug('routes to empty path: '+ pathname);
	}
};
