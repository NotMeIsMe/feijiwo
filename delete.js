var mysqlStarter = require('./mysql.js');
function deleteData(tableName,userName,friendName) {
	mysqlStarter.mysqlStart("DELETE FROM " + tableName + " WHERE user=" + userName + " AND friend=" + friendName + ";");
}

function deleteMessage(tableName,authKey,recipKey,idKey) {
	mysqlStarter.mysqlStart("DELETE FROM " + tableName + " WHERE auth=" + authKey + " AND recip=" + recipKey + " AND id=" + idKey + ";");
}

exports.deleteData = deleteData;
exports.deleteMessage = deleteMessage;