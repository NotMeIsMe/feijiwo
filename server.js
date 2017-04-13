var express = require('express');
var bodyParser = require('body-parser');
var insertDatar = require('./insert.js');
var queryDatar = require('./query.js');
var updateDatar = require('./update.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var filter = require('./filter.js');
var deleteDatar = require('./delete.js');
var searchDatar = require('./search.js');
var app = express();

app.use(session({
	resave: true,
	saveUninitialized: false,
	secret: 'feijiwo'
}));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('Design'));

app.get("/userCheck", filter.authorize, function (req, res) {
	var userName = req.session.user;
	res.send(req.session.user);
});

app.get("/logout", function (req, res) {
	req.session.destroy();
	res.send("true");
});
app.get("/listCheck", function (req, res) {
	res.send(req.session.list);
});
app.get("/news", function (req, res) {
	req.session.list = "news";
	res.redirect("lists.html");
});
app.get("/music", function (req, res) {
	req.session.list = "music";
	res.redirect("/lists.html");
});
app.get("/fun", function (req, res) {
	req.session.list = "fun";
	res.redirect("/lists.html");
});
app.get("/health", function (req, res) {
	req.session.list = "health";
	res.redirect("/lists.html");
});
app.get("/wiki", function (req, res) {
	req.session.list = "wiki";
	res.redirect("/lists.html");
});
app.get("/weather", function (req, res) {
	req.session.list = "weather";
	res.redirect("/lists.html");
});
app.get("/star", function (req, res) {
	req.session.list = "star";
	res.redirect("/lists.html");
});
app.get("/movie", function (req, res) {
	req.session.list = "movie";
	res.redirect("/lists.html");
});
app.post("/signupForm", function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var address = req.body.address;
	var sex = req.body.sexRadio;
	var values = "'" + username + "'" + ',' + "'" + password + "'" + ',' + "'" + address + "'" + ',' + "'" + sex + "'";
	var tableName = 'users';
	insertDatar.insertData(tableName, values);
	res.redirect("signin.html");
});

app.post("/signinForm", function (req, res) {
	var username = "'" + req.body.user + "'";
	var password = req.body.pass;
	var tableName = 'users';
	queryDatar.queryData(tableName, username, function (resn) {
		var resn = JSON.stringify(resn);
		resn = eval(resn);
		if (resn.length == 1) {
			console.log("user is available");
			if (resn[0]['password'] == req.body.pass) {
				console.log("password is available");
				req.session.user = req.body.user;
				req.session.recip = req.body.user;
				res.send("true");
			} else {
				console.log("password is not available");
				res.send("wrongPass");
			}
		} else {
			res.send("wrongUser");
			console.log("user is not available");
		}

	});
});

app.post("/queryForm", function (req, res) {
	var tableName = 'users';
	var userName = "'" + req.body.name + "'";
	queryDatar.queryData(tableName, userName, function (resn) {
		if (resn.length > 0) {
			res.send("false");
		} else {
			res.send("true");
		}

	});
});
app.post("/search-view", function (req, res) {
	var tableName = 'messages';
	var tableName1 = 'users';
	var userName = "'" + req.body.name + "'";
	queryDatar.queryData(tableName1, userName, function (resn) {
		if (resn.length > 0) {
			req.session.recip = req.body.name;
			searchDatar.searchData(tableName, userName, function (resn) {
				res.send(resn);
			});
		} else {
			return res.send("false");
		}
	});
});
app.post("/writeMessage", function (req, res) {
	var text = req.body.text;
	var pm = req.body.pm;
	var time = req.body.time;
	var auth = req.session.user;
	var recip = req.session.recip;
	var newMes = '1';
	var tableName = 'messages';
	var values = "NULL" + ',' + "'" + auth + "'" + ',' + "'" + recip + "'" + ',' + "'" + newMes + "'" + ',' + "'" + pm + "'" + ',' + "'" + time + "'" + ',' + "'" + text + "'";
	insertDatar.insertData(tableName, values);
	res.send("seccess");
});
app.get("/getRecip", function (req, res) {
	if (req.session.user == req.session.recip) {
		res.send("same");
	} else {
		res.send(req.session.recip);
	}
});
app.get("/getFollow", function (req, res) {
	var tableName = 'friends';
	var userName = "'" + req.session.user + "'";
	queryDatar.queryFollow(tableName, userName, function (resn) {
		res.send(resn);
	});
});
app.get("/checkFriend", function (req, res) {
	var tableName = 'friends';
	var userName = "'" + req.session.user + "'";
	var friendName = "'" + req.session.recip + "'";
	if (req.session.user === req.session.recip) {
		res.send("same");
	} else {
		queryDatar.queryFriends(tableName, userName, friendName, function (resn) {
			if (resn.length > 0) {
				res.send("delete");
			} else {
				res.send("insert");
			}
		});
	}
});
app.get("/getUser", function (req, res) {
	res.send(req.session.user);
});
app.get("/makeFriends", function (req, res) {
	var tableName = 'friends';
	var userName = "'" + req.session.user + "'";
	var friendName = "'" + req.session.recip + "'";
	var values = userName + "," + friendName;
	queryDatar.queryFriends(tableName, userName, friendName, function (resn) {
		if (resn.length > 0) {
			deleteDatar.deleteData(tableName, userName, friendName);
			res.send("delete");
		} else {
			insertDatar.insertData(tableName, values);
			res.send("insert");
		}
	});

});

app.post("/deleteMessage", function (req, res) {
	var tableName = 'messages';
	var authKey = "'" + req.body.auth + "'";
	var recipKey = "'" + req.body.recip + "'";
	var idKey = "'" + req.body.id + "'";
	deleteDatar.deleteMessage(tableName, authKey, recipKey, idKey);
	res.send("OK");
});

app.get("/checkScore", function (req, res) {
	var tableName = 'games';
	var userName = "'" + req.session.user + "'";
	queryDatar.queryScore(tableName, userName, function (data) {
		if (data.length < 1) {
			var gameTable = 'games';
			var gameValues = "'" + req.session.user + "'" + "," + "'simon'" + "," + "'0'";
			insertDatar.insertData(gameTable,gameValues);
			res.send("none");
		} else {
			res.send(data);
		}
	});
});
app.post("/updateScore",function(req,res){
	var tableName = 'games';
	var userName = "'" + req.session.user + "'";
	var score = "'" + req.body.score + "'";
	queryDatar.queryScore(tableName, userName, function (data) {
		if(parseInt(req.body.score) - 1 > parseInt(data[0].score)) {
			updateDatar.updateData(tableName,userName,score,function(data) {
				res.send("OK");
			});
		} else {
			res.send("less");
		}
	});
});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("访问地址为 http://%s:%s", host, port);
});
console.log("Server running at http://127.0.0.1:8080");
