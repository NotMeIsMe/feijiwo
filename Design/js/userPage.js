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
		var cf = confirm("确定要注销？");
		if(cf === true) {
			$.get("/logout",function(data,status){
				if(data == "true") {
				window.location.href = "/index.html";
				}
			});
		}
	});
	function formatterDateTime() {
    	var date=new Date()
    	var month=date.getMonth() + 1
        var datetime = date.getFullYear()
                + "/"// "年"
                + (month >= 10 ? month : "0"+ month)
                + "/"// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate())
                + "  "
                + (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours())
                + ":"
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes())
                + ":"
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
        return datetime;
    }
	function clocks() {
		var date = new Date();
		$(".clock-timer").text(formatterDateTime());
		window.setTimeout(clocks,1000);
	}
	window.setTimeout(clocks,1000);
});