function updateData(tableName,userName,score,cb) {
	var mysqlStarter = require('./mysql.js');
	mysqlStarter.mysqlStart("UPDATE " + tableName + " SET score=" + score + " WHERE user=" + userName + ";", cb);
}
exports.updateData = updateData;