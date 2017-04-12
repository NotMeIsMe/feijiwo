var mysqlStarter = require('./mysql.js');
function queryData(tableName,userName,cb) {
	mysqlStarter.mysqlStart("SELECT * FROM "+ tableName + " WHERE user=" + userName + ";", cb);
}
function queryFollow(tableName,userName,cb) {
	mysqlStarter.mysqlStart("SELECT * FROM "+ tableName + " WHERE user=" + userName + " or friend=" + userName + ";", cb);
}
function queryFriends(tableName,userName,friendName,cb) {
	mysqlStarter.mysqlStart("SELECT * FROM "+ tableName + " WHERE user=" + userName + " AND friend=" + friendName + ";", cb);
}
function queryScore(tableName,userName,cb) {
	mysqlStarter.mysqlStart("SELECT score FROM " + tableName + " WHERE user=" + userName + ";", cb);
}
exports.queryData = queryData;
exports.queryFriends = queryFriends;
exports.queryFollow = queryFollow;
exports.queryScore = queryScore;
