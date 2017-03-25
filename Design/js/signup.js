$(function(){
	$("#username").focus(function() {
		$('.username-err').text("");
	});
	$("#password").focus(function() {
		$(".password-err").text("");
	});
	$("#address").focus(function() {
		$(".address-err").text("");
	});
	$("input[type='radio']").focus(function() {
		$(".sexRadio-err").text("");
	});
	$('.submit-bt').click(function(){
		var k1,k2,k3,k4;
		var username = $("#username").val();
		var password = $("#password").val();
		var address = $("#address").val();
		var sex = $("input[type='radio']:checked").val();
		function isHasUserName(username, cb) {
			var userObj ={};
			userObj['name'] = username;
			$.post("/queryForm",userObj,function(data,status){
				cb(data);
			});
		}
		function isUserName(str) {
			var re = /^[a-zA-Z]\w{3,15}$/;
			if(re.test(str)) {
				$('.username-err').text("");
				k1 = true;
			} else {
				k1 = false;
				$("#username").val("");
				$('.username-err').text("由4-16位的以字母开头，字母，数字或者下划线组成！");
			}
		}
		function isPassword(str) {
			var re = /^\w{4,16}$/;
			if(re.test(str)) {
				$('.password-err').text("");
				k2 = true;
			} else {
				k2 = false;
				$("#password").val("");
				$('.password-err').text("由4-16位的任意字母，数字或者下划线组成！");
			}
		}
		function isAddress(str) {
			var re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
			if(re.test(str)) {
				$('.address-err').text("");
				k3 = true;
			} else {
				k3 = false;
				$("#address").val("");
				$('.address-err').text("非法邮箱格式！");
			}
		}
		function isSex(str) {
			if (typeof str == "string") {
				k4 = true;
				$(".sexRadio-err").text("");
			} else {
				k4 = false;
				$(".sexRadio-err").text("请选择您的性别！");
			}
		}
		isUserName(username);
		isPassword(password);
		isAddress(address);
		isSex(sex);
		isHasUserName(username,function(data) {
			if(data == "true") {
				if(k1 && k2 && k3 && k4) {
					alert("注册成功！");
					$(".signup-form").submit();
				}		
			} else {
				$('.username-err').text("此用户名已被注册！");
			}
			
		});
	});
});