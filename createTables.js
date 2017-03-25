var mysqlStarter = require('./mysql.js');

function createTable(name,query) {
	mysqlStarter.mysqlStart("CREATE TABLE IF NOT EXISTS "+ name +"("+ query +")");
}
createTable('users','user VARCHAR(16),password VARCHAR(16),address VARCHAR(16),sex VARCHAR(16),INDEX(user(6))');
createTable('messages','id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,auth VARCHAR(16),recip VARCHAR(16),newMes VARCHAR(16),pm CHAR(1),time INT UNSIGNED,message VARCHAR(4096),INDEX(auth(6)),INDEX(recip(6))');
createTable('friends','user VARCHAR(16),friend VARCHAR(16),INDEX(user(6)),INDEX(friend(6))');