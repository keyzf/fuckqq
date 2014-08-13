/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-12 22:43:30
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

var mongoose = require('mongoose'),
	debug = require('debug')('mongodb'),

	cfg = require('../config');

mongoose.connect(cfg.db, function(err) {
	if (err) {
		debug('connect to %s error: ', cofnig.db, err.message);
		process.exit(1);
	}
});


// set up models
require('./user');

exports.User = mongoose.model('User');