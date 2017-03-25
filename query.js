function queryData(tableName,userName,cb) {
	var mysqlStarter = require('./mysql.js');
	var queryResult = mysqlStarter.mysqlStart("SELECT * FROM "+ tableName +" WHERE user=" + userName+ ";", cb);
	return queryResult;
}
function queryFriends(tableName,userName,friendName,cb) {
	var mysqlStarter = require('./mysql.js');
	var queryResult = mysqlStarter.mysqlStart("SELECT * FROM "+ tableName +" WHERE user=" + userName + " AND friend=" + friendName + ";", cb);
	return queryResult;
}

exports.queryData = queryData;
exports.queryFriends = queryFriends;
