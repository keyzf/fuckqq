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


var slice = Array.prototype.slice;

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

var use = function (path) {
	var handle;
	if (typeof path === 'string') {
		handle = {
			path: pathRegexp(path),
			stack: slice.call(arguments, 1)
		};
	}
	else {
		handle = {
			path: pathRegexp('/'),
			// 其他的都是处理单元
			stack: slice.call(arguments, 0)
		};
	}

	routes.all.push(handle);
};

// Create, Read, Update, Delete 
['post', 'get', 'put', 'delete'].forEach(function (method) {
	routes[method] = [];
	app[method] = function (path) {
		routes[method].push({
			path: pathRegexp(path),
			stack: slice.call(arguments, 1)
		});
	};
});

var handle = function (req, res, stack) {
	var next = function () {
		// 从stack数组中取出中间件并执行
		var middleware = stack.shift();
		if (middleware) {
			// 传入next()函数自身，使中间件能够执行结束后递归
			middleware(req, res, next);
		}
	};

	// 启动执行
	next();
};

var match = function (pathname, routes, req, res) {
	var i = 0,
		l_r = routes.length,
		route, stacks = [];

	for (; i<l_r; i++) {
		route = routes[i];
		// 正则匹配
		var reg = route.path.regexp;
		var keys = route.path.keys;
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
			// 将中间件都保存起来
			stacks = stacks.concat(route.stack);
		}
	}
	return stacks;
};

app.routes = routes;
app.use = use;
app.handle = handle;
app.match = match;

module.exports = app;