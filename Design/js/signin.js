$(function(){
	$("#username").focus(function() {
		$('.username-err').text("");
	});
	$("#password").focus(function() {
		$(".password-err").text("");
	});
	$('.signInBtn1').click(function(){
		var obj = {};
		var username = $('#username').val();
		var password = $('#password').val();
		if(username == "") {
			$('.username-err').text("用户名不能为空");
			return;
		}
		if(password == "") {
			$('.password-err').text("密码不能为空！");
			return;
		}
		obj['user'] = username;
		obj['pass'] = password;
		$.post('/signinForm',obj,function(data, status){
			if(data == "wrongUser") {
				$('#username').val("");
				$('#password').val("");
				$('.username-err').text("不存在此用户名！");
			} else if(data == "wrongPass") {
				$('#password').val("");
				$('.password-err').text("密码错误！");
			} else if(data == "true") {
				window.location.href = "/userPage.html";
			}
		});
	});
});