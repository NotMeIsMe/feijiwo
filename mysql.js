function mysqlStart(query, cb) {
	var mysql = require('mysql');
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'mydata',
		port: 3306
	});
	conn.connect();
	function queryMysql(query, cb) {
		conn.query(query,function(err,res){
			if(err) {
				console.log(err);
			}
			if(cb !== undefined) {
				cb(res);
			}
			
		});
	}	
	queryMysql(query, cb);
	conn.end();
}
exports.mysqlStart = mysqlStart;
