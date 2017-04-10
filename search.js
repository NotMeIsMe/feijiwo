function searchData(tableName,userName,cb) {
	var mysqlStarter = require('./mysql.js');
	mysqlStarter.mysqlStart("SELECT * FROM "+ tableName +" WHERE auth=" + userName+ " OR recip=" + userName +" ORDER BY time DESC;", cb);
}

exports.searchData = searchData;