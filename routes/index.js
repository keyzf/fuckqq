/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-15 14:06:09
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

// var url = require('url');

var pathRegexp = function (path) {
	var keys = [];

	path = path
			// .concat(strict ? '' : '/?')
			.replace(/\/\(/g, '(?:/')
			.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,
					function (_, slash, format, key, capture, optional, star) {
						keys.push(key); // 将匹配到的键值保存起来
						slash = slash || '';
						return '' +
							(optional ? '' : slash) +
							'(?:' +
							(optional ? slash : '') +
							(format || '') + (capture || (format && '([^/.]+?)' || '(^/)+?')) + ')' +
							(optional || '') +
							(star ? '(/*)?' : '');
					})
			.replace(/([\/.])/g, '\\$1')
			.replace(/\*/g, '(.*)');

	return {
		keys: keys,
		regexp: new RegExp('^' + path + '$')
	};
};

var routes = {'all': []},
	app = {};

var use = function (path, action) {
	routes.push([pathRegexp(path), action]);
};

// Create, Read, Update, Delete 
['post', 'get', 'put', 'delete'].forEach(function (method) {
	routes[method] = [];
	app[method] = function (path, action) {
		routes[method].push([pathRegexp(path), action]);
	};
});

var match = function (pathname, routes, req, res) {
	var i = 0,
		l_r = routes.length,
		route;

	for (; i<l_r; i++) {
		route = routes[i];
		// 正则匹配
		var reg = route[0].regexp;
		var keys = route[0].keys;
		var matched = reg.exec(pathname);

		if (matched) {
			// 抽取具体值
			var params = {},
				j = 0,
				l_k = keys.length;

			for (; j<l_k; j++) {
				var value = matched[j + 1];
				if (value) {
					params[keys[i]] = vlaue;
				}
			}
			req.params = params;

			var action = route[1];
			action(req, res);
			return true;
		}
	}

	return false;
};

app.routes = routes;
app.use = use;
app.match = match;

module.exports = app;


// var onRequest = function (req, res) {
// 	var pathname = url.parse(req.url).pathname,
// 		method = req.method.toLowerCase();

// 	if (routes.hasOwnProperty(method)) {
// 		if (match(pathname, routes[method])) {
// 			// 根据请求方法分支
// 			return;
// 		}
// 		else {
// 			// 如果路径没有匹配成功，尝试让all()来处理
// 			if (match(pathname, routes.all)) {
// 				return;
// 			}
// 		}
// 	}
// 	else {
// 		// 直接让all()来处理
// 		if (match(pathname, routes.all)) {
// 			return;
// 		}
// 	}

// 	handle404(req, res);
// };
