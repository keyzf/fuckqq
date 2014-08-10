var server = require('./server');
var router = require('./router');
var db     = require('./db');

server.start(router.route);
db.dbConnect();
