exports.authorize = function(req, res, next) {
  if (!req.session.user) {
  	console.log("redirect!");
    res.send("false");
  } else {
    next();
  }
}