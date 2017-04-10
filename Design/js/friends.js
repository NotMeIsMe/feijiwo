$(function(){
	$("#pm1").attr("checked","checked");
	$("#pm1").removeAttr("checked");
	$("#pm2").attr("checked","checked");
	$("#pm2").removeAttr("checked");
	$("#pm1").attr("checked","checked");
	$.get("/userCheck",function(data,status){
		if(data == "false") {
			alert("请先登录！");
			window.location.href = "/signin.html";
		}
	});
	$(".logout").click(function(){
		$.get("/logout",function(data,status){
			var cf = confirm("确定要注销？");
			if(cf == true) {
				if(data == "true") {
					window.location.href = "/index.html";
				}
			}
		});
	});
	function formatterDateTime() {
    var date=new Date()
    var month=date.getMonth() + 1
        var datetime =(month >= 10 ? month : "0"+ month)
                + ""// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate())
                + ""
                + (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours())
                + ""
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes())
                + ""
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
        return datetime;
    }
    function freeTime(time){
    	if(time.length !== 10) {
    		time = "0"+time;
    	}
    	console.log(time);
    	return time.slice(0,2)+"/"+time.slice(2,4)+"  "+time.slice(4,6)+":"+time.slice(6,8)+":"+time.slice(8);
    }
	$(".following").click(function(){
		$(".following-list>li").slideToggle();
	});
	$(".follower").click(function(){
		$(".follower-list>li").slideToggle();
	});
	$(".mutual").click(function(){
		$(".mutual-list>li").slideToggle();
	});

	var app = angular.module("space",[]);
	app.controller("friendsCtrl",function($scope,$http){
		$scope.key = true;
		$scope.name = "我";
		$scope.recip = "";
		$scope.user = "";
		$scope.followings = [];
		$scope.followers = [];
		$scope.mutuals = [];
		$http({
			method: 'GET',
			url: '/getUser'
		}).success(function(data){
			$scope.user = data;
			$scope.search("me");
		});
		$http({
			method: 'GET',
			url: '/getFollow'
		}).success(function(data){
			
		});
		$scope.checkFriend = function() {
			$http({
				method: 'GET',
				url: '/checkFriend'
			}).success(function(data){
				if(data == "delete") {
					$(".follow").text("已关注");
				} else if(data == "insert") {
					$(".follow").text("关注");
				} else if(data == "same") {
					$(".follow").text("");
				}
			});			
		};

		$scope.getRe = function(){
			$http({
				method: 'GET',
				url: '/getRecip'
			}).success(function(data){
				if(data !== "same") {
					$scope.name = data;
					$scope.recip = data;
				} else {
					$scope.name = "我";
					$scope.recip = $scope.user;
				}
			});			
		}
		$scope.makeFriends = function(){
				$http({
					method: 'GET',
					url: '/makeFriends'
				}).success(function(data){
					if(data == "delete") {
						$(".follow").text("关注");
					} else if(data == "insert") {
						$(".follow").text("已关注");
					}
				});	
		}
		$scope.getFriends = function(){
			$scope.followings = [];
			$scope.followers = [];
			$scope.mutuals = [];
			$http({
				method: 'GET',
				url: '/getFriends',
			}).success(function(data){

			});
		}
		$scope.search = function(me){
			var name = $(".search-text").val();
			if(me == "me") {
				name = $scope.user;
			} else if(typeof me == "string") {
				name = me;
			}
			if(name == "" && $scope.key) {
				alert("关键词不能为空！");
				return;
			}
			if(!$scope.key) {
				name = $scope.recip;
			}
			var obj = {};
			obj["name"] = name;
			$http({
				method: 'POST',
				url: '/search-view',
				data: obj
			}).success(function(data){
				if(data == "false" && $scope.key) {
					alert("该用户不存在!");
					return;
				}
				$scope.key = true;
				$scope.messages = [];
				var results = data;
				$scope.getRe();
				angular.forEach(results,function(re){
					var auth,recip,pm,message,time,erase;
					if(re.pm == "0" || re.auth == $scope.user || re.recip == $scope.user){
						auth = re.auth;
						recip = "跟 "+re.recip;
						message = re.message;
						time = freeTime(re.time+"");
						if(re.pm == "0") {
							pm = " 说:";
						} else {
							pm = " 私聊:";
						}
						if(re.auth == $scope.user) {
							auth = "你";
						}
						if(re.recip == $scope.user) {
							recip = "跟你";
						}
						if(re.auth == re.recip) {
							recip = " 在空间";
							if(re.pm == "1") {
								pm = "(仅自己可见)说：";
							}
						}
						if(re.auth == $scope.user || re.recip == $scope.user) {
							erase = true;
						}
					}
					if(typeof auth == "string") {
						$scope.messages.push({au: auth,rec: recip,mess:message,tim:time,p: pm,era: erase});
					}
					$scope.checkFriend();
				});
				console.log($scope.messages);
			});
		}
		$scope.sendText = function(){
			var text = $(".text").val();
			if(text == "") {
				alert("留言不能为空！");
				return;
			}
			var obj = {};
			obj["text"] = text;
			var pm = $("input[name='pm']:checked").val();
			obj["pm"] = pm;
			var time = formatterDateTime();
			obj["time"] = time;
			$http({
				method: 'POST',
				url: '/writeMessage',
				data: obj
			}).success(function(data){
				if(data) {
					alert("留言成功！");
					$(".text").val("");
					$scope.key = false;
					$scope.search();
				}
			});		
		}
		$scope.checkFriend();
		$scope.getRe();	

	});

});