/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-13 13:36:05
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

var path = require('path'),
	pkg = require('./package.json');

var config = {
	name: 'FuckQQ',
	description: '',
	version: pkg.version,

	host: 'localhost',

	db: 'mongodb://localhost/fuckqq',
	db_name: 'fuckqq',

	port: 8888
};

module.exports = config;