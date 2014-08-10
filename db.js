var mongodb = require('mongodb');
var server  = new mongodb.Server('localhost', 27017, {auto_reconnect : true});
var db      = new mongodb.Db('mess', server, {safe : true});

function dbConnect () {

	db.open(function (err, db) {
		if (!err) {
			console.log('db connect!');
		} else {
			console.log(err);
		}
	});
	
}

exports.dbConnect = dbConnect;
exports.db = db;
