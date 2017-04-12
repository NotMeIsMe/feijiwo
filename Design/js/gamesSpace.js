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
  $.get('/checkScore',function(res){
    if(res == "none") {
      
    }
  });
  var blocks = [];
  var tempBlocks = [];
  var timer1;
  var timer2;
  var timer3;
  var aheadKey = true;
  var blocksArr = document.getElementsByClassName("block");
  var audio = document.getElementsByClassName("audio");
  $(".blockCounts").text("0");
  
  var colorRandom = function() {
    return Math.floor(Math.random()*4);
  };
  var resetGame = function() {
  	window.location.href = "/gamesSpace.html";
  }
  var doFlash = function() {
  	$(".block").addClass("unclickable");
    blocks.push(colorRandom());
    var k = 0;
    blocks.forEach(function(val) {
      timer3 = window.setTimeout(function() {
        audio[val].play();
        $(blocksArr[val]).fadeOut();
        $(blocksArr[val]).fadeIn();
      },1200*k);
      k++;
    });
    $(".blockCounts").text(blocks.length);
    $(".block").removeClass("unclickable");
  };
  var blockClick = function() {
    $(this).fadeOut();
    $(this).fadeIn();
    var blockNum = $(this).attr("value")
    tempBlocks.push(blockNum);
    audio[blockNum].play();
    if(blockNum != blocks[tempBlocks.length-1]) {
      if($("input[name='module']:checked").val() == "easy") {
        alert("Wrong!Try agian!")
        tempBlocks = [];
      } else if($("input[name='module']:checked").val() == "hard") {
        alert("You loose!I will reset your game!");
        resetGame();
        return;
      }
    }
    if(tempBlocks.length == 20) {
    	alert("You Win!");
     	if(aheadKey == true) {
     		var ahead = confirm("你希望继续挑战，刷新最高纪录吗？");
     		if(ahead === false) {
     			resetGame();
      		} else {
      			aheadKey == false;
      		}
      }
    }
    if(tempBlocks.length == blocks.length) {
    	$(".block").addClass("unclickable");
      	timer1 = window.setTimeout( function() {
    		blocks.push(colorRandom());
    		var k = 0;
    		var speed = 1200;
    		if(blocks.length > 3) {
    			speed = 700;
  			} else if(blocks.length > 6) {
  				speed = 900;
  			} else if(blocks.length > 9) {
  				speed = 800;
  			} else if(blocks.length > 12) {
  				speed = 700;
  			}
   		 	blocks.forEach(function(val,index) {
      			timer2 = window.setTimeout(function() {
        		audio[val].play();
        		$(blocksArr[val]).fadeOut();
        		$(blocksArr[val]).fadeIn();
        		if(index == blocks.length - 1) {
        			$(".block").removeClass("unclickable");
        		}
      		},speed*k);
     		k++;
    	});
        $(".blockCounts").text(blocks.length);
  	},1200);
      tempBlocks = []; 
    }
  };
  $(".startBtn").click(function() {
    $(this).addClass("unclickable");
    doFlash();
    $(".block").click(blockClick); 
  });
  $(".resetBtn").click(resetGame);
});
