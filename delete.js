function deleteData(tableName,userName,friendName) {
	var mysqlStarter = require('./mysql.js');
	var deleteResult = mysqlStarter.mysqlStart("DELETE FROM "+ tableName + " WHERE user="+ userName +" AND friend=" + friendName + ";");
	return deleteResult;
}

exports.deleteData = deleteData;