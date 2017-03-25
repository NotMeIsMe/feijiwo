function searchData(tableName,userName,cb) {
	var mysqlStarter = require('./mysql.js');
	var searchResult = mysqlStarter.mysqlStart("SELECT * FROM "+ tableName +" WHERE auth=" + userName+ " OR recip=" + userName +" ORDER BY time DESC;", cb);
	return searchResult;
}

exports.searchData = searchData;