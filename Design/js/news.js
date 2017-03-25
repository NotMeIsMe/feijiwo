$(function(){
	$(document).scroll(function(){
		if(document.body.scrollTop > 80) {
			$(".left-bar").css({"top": "0px"});
		} else {
			$(".left-bar").css({"top": "112px"});
		}
	});
	$.get("/listCheck",function(data){
		var sec = document.getElementsByClassName(data)[0];
		$(sec).click();
	});
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
        var datetime = date.getFullYear()
                + ""// "年"
                + (month >= 10 ? month : "0"+ month)
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
	$(".wiki").click(function(){
		$(".things").css({"display": "none"});
		$(".wiki-content").css({"display": "block"});
	});
	$(".news").click(function(){
		$(".things").css({"display": "none"});
		$(".news-content").css({"display": "block"});
	});
	$(".music").click(function(){
		$(".things").css({"display": "none"});
		$(".music-content").css({"display": "block"});
	});
	$(".fun").click(function(){
		$(".things").css({"display": "none"});
		$(".fun-content").css({"display": "block"});
	});
	$(".health").click(function(){
		$(".things").css({"display": "none"});
		$(".health-content").css({"display": "block"});
	});
	$(".game").click(function(){
		$(".things").css({"display": "none"});
		$(".game-content").css({"display": "block"});
	});
	$(".weather").click(function(){
		$(".things").css({"display": "none"});
		$(".weather-content").css({"display": "block"});
	});
	$(".star").click(function(){
		$(".things").css({"display": "none"});
		$(".star-content").css({"display": "block"});
	});
	$(".photo").click(function(){
		$(".things").css({"display": "none"});
		$(".photo-content").css({"display": "block"});
	});
	$(".movie").click(function(){
		$(".things").css({"display": "none"});
		$(".movie-content").css({"display": "block"});
	});
	var app = angular.module("myApp",[]);

	app.controller("newsCtrl",function($scope,$http){
		$scope.name = "实时新闻";
		$scope.search = function(){
			var title = $scope.text;
			$scope.newsResults = [];
			$http({
    			method: 'POST',
    			url: 'https://route.showapi.com/109-35',
    			params: {
    				"title": title,
    				"page": "1",
    				"needContent": "1",
    				"maxResult": "20",
        			"showapi_timestamp": formatterDateTime(),
         			"showapi_appid": '33551',
        			 "showapi_sign": 'c5dadcaa73fa4bfeb3d6a9c43fa047ec'
 
    			}}).success(function(data) {
       			 	var results = data.showapi_res_body.pagebean.contentlist;
       			 	angular.forEach(results,function(re){  
       			 		if(re.imageurls.length !== 0) {
       			 			$scope.newsResults.push({title:re.title,body:re.desc,page:re.link,content:re.content,date:re.pubDate,image:re.imageurls["0"].url});	
   						}
   					});
   			 	});
   			 	
		};
		$scope.search();
	});
	app.controller("musicCtrl",function($scope,$http,$sce){
		$scope.name = "音乐之美";
		$scope.search = function(){
			var keyword = $scope.text;
			$scope.musicResults = [];
			$http({
    			method: 'POST',
    			url: 'https://route.showapi.com/213-1',
    			params: {
    				"keyword": keyword,
    				"page": "1",
        			"showapi_timestamp": formatterDateTime(),
         			"showapi_appid": '33551',
        			"showapi_sign": 'c5dadcaa73fa4bfeb3d6a9c43fa047ec'
    			}}).success(function(data) {
    				var results = data.showapi_res_body.pagebean.contentlist;
   					angular.forEach(results,function(re){    
    					$scope.musicResults.push({songname: re.songname,singername:re.singername,albumname:re.albumname,m4a:$sce.trustAsResourceUrl(re.m4a),albumpic:re.albumpic_big});
   				});
   					$scope.musicResults = $scope.musicResults.slice(0,20);
   			 	});
   			 	
		};
	});
	app.controller("funCtrl",function($scope,$http){
		$scope.name = "开心时刻";
		$scope.search = function(){
			var page = $scope.text;
			$scope.funResults = [];
			$http({
    			method: 'POST',
    			url: 'https://route.showapi.com/341-1',
    			params: {
    				"time": "2015-07-10",
    				"page": page,
        			"showapi_timestamp": formatterDateTime(),
         			"showapi_appid": '33551',
        			"showapi_sign": 'c5dadcaa73fa4bfeb3d6a9c43fa047ec'
    			}}).success(function(data) {
    				var results = data.showapi_res_body.contentlist;
   					angular.forEach(results,function(re){ 
    					$scope.funResults.push({ct: re.ct,text:re.text.replace(/<.*?>/ig,"")});
   					});
   			 	});
   			 	
		};		
		$scope.search();
	});
	app.controller("healthCtrl",function($scope,$http){
		$scope.name = "健康知识";
		$scope.search = function(){
			var key = $scope.text;
			$scope.healthResults = [];
			$http({
    			method: 'POST',
    			url: 'https://route.showapi.com/90-87',
    			params: {
    				"key": key,
        			"showapi_timestamp": formatterDateTime(),
         			"showapi_appid": '33551',
        			"showapi_sign": 'c5dadcaa73fa4bfeb3d6a9c43fa047ec'
    			}}).success(function(data) {
    				var results = data.showapi_res_body.pagebean.contentlist;
   					angular.forEach(results,function(re){ 
    					$scope.healthResults.push({title: re.title,ct:re.ctime,intro:re.intro,url:re.url});
   					});
   			 	}); 	
		};	
		$scope.search();
	});
	app.controller("wikiCtrl",function($scope,$http){
		$scope.name = "维基快搜";
 		$scope.search = function() {
  			$scope.wikiResults = [];
  			var title = $scope.text;
  			var api = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
 			var cb =  '&callback=JSON_CALLBACK';
  			var page = 'http://en.wikipedia.org/?curid=';
  			$http.jsonp(api+title+cb).success(function(data){
   				var results = data.query.pages;
    			angular.forEach(results,function(re){    
    				$scope.wikiResults.push({title:re.title,body:re.extract,page:page+re.pageid})
   				});
 			});
  		};
 		$scope.reset = function(){
   			 $scope.wikiResults = {};
   			 $scope.text = "";
 		}
	});
	app.controller("weatherCtrl",function($scope,$http){
		$scope.name = "实时天气";
		$scope.search = function(){
		var area = $scope.text;
		$scope.weatherResults = [];
		$http({
    		method: 'POST',
    		url: 'https://route.showapi.com/9-2',
    		params: {
    			"area": area,
    			"needMoreDay": "0",
        		"showapi_timestamp": formatterDateTime(),
         		"showapi_appid": '33551',
        		"showapi_sign": 'c5dadcaa73fa4bfeb3d6a9c43fa047ec'
    		}}).success(function(data) {
    			$scope.weatherResults = data.showapi_res_body;
    			$(".weather-wrap").css({"display": "block"});
   			 }); 	
		};	
	});
	app.controller("starCtrl",function($scope,$http){
		$scope.name = "星座运势";
		$scope.search = function(){
		var keyword = $scope.text;
		switch(keyword) {
			case "金牛":
			case "金牛座":
				keyword = "jinniu";
				break;
			case "白羊":
			case "白羊座":
				keyword = "baiyang";
				break;
			case "双子":
			case "双子座":
				keyword = "shuangzi";
				break;
			case "巨蟹":
			case "巨蟹座":
				keyword = "juxie";
				break;
			case "狮子":
			case "狮子座":
				keyword = "shizi";
				break;
			case "处女":
			case "处女座":
				keyword = "chunv";
				break;
			case "天秤":
			case "天秤座":
				keyword = "tiancheng";
				break;
			case "天蝎":
			case "天蝎座":
				keyword = "tianxie";
				break;
			case "射手":
			case "射手座":
				keyword = "sheshou";
				break;
			case "摩羯":
			case "摩羯座":
				keyword = "mojie";
				break;
			case "水瓶":
			case "水瓶座":
				keyword = "shuiping";
				break;
			case "双鱼":
			case "双鱼座":
				keyword = "shuangyu";
				break;
		}
		$scope.starResults = [];
		$http({
    		method: 'POST',
    		url: 'https://route.showapi.com/872-1',
    		params: {
    			"star": keyword,
    			"needWeek": "1",
        		"showapi_timestamp": formatterDateTime(),
         		"showapi_appid": '33551',
        		"showapi_sign": 'c5dadcaa73fa4bfeb3d6a9c43fa047ec'
    		}}).success(function(data) {
    			$scope.starResults = data.showapi_res_body;
    			$(".star-wrap").css({"display": "block"});
   			 }); 	
		};	
	});
	app.controller("movieCtrl",function($scope,$http){
		$scope.name = "单月票房排行";
		$scope.search = function(){
		$scope.movieResults = [];
		$http({
    		method: 'POST',
    		url: 'https://route.showapi.com/578-4',
    		params: {
        		"showapi_timestamp": formatterDateTime(),
         		"showapi_appid": '33551',
        		"showapi_sign": 'c5dadcaa73fa4bfeb3d6a9c43fa047ec'
    		}}).success(function(data) {
    			var results = data.showapi_res_body.datalist;
    			angular.forEach(results,function(re){    
    				$scope.movieResults.push({rank:re.rank,boxoffice:re.boxoffice,box_pro:re.box_pro,releaseTime:re.releaseTime,MovieName:re.MovieName});
   				});
   			 }); 	
		};	
		$scope.search();
	});
});