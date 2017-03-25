function insertData(tableName,values) {
	var mysqlStarter = require('./mysql.js');
	mysqlStarter.mysqlStart("INSERT INTO " + tableName + " VALUES("+ values +");");
}

exports.insertData = insertData;