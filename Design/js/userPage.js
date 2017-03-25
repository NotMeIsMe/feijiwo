$(function(){	
	$.get("/userCheck",function(data,status){
		if(data == "false") {
			alert("请先登录！");
			window.location.href = "/signin.html";
		} else {
			$(".header-name").text(data);
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

	function clocks() {
		var date = new Date();
		$(".clock-timer").text("Clock: " + date.getHours() + ": " + date.getMinutes() + ": " + date.getSeconds());
		window.setTimeout(clocks,1000);
	}
	window.setTimeout(clocks,1000);
});