/**
 * 
 * @authors Wang Fei (QQ941721234, wangfei.f2e@gmail.com, http://www.gooofly.com))
 * @date    2014-08-13 13:45:43
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

var utility = require('utility'),

	mongoose = require('mongoose'),

	config = require('../config');

var Schema = mongoose.Schema,
	UserSchema = new Schema({
		user_id: {type: Number, default: 0},
		name: String, // real name
		alias: String, // alias for login
		pass: String, // password
		email: String, 
		avatar: String, // avatar images url

		github: String, // username for github
		url: String, // blog website
		weibo: String, // sina weibo url

		score: {type: Number, default: 0}, // score for chatroom




	});

UserSchema.virtual('avatar_url').get(function () {
	var url = this.avatar || ('http://www.gravatar.com/avatar/' + utility.md5(this.email.toLowerCase()) + '?size=48');
	return url;
});

UserSchema.index({name: 1});
UserSchema.index({alias: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
UserSchema.index({score: -1});
UserSchema.index({github: 1});

mongoose.model('User', UserSchema);