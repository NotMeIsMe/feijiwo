$(function() {
	
	var introduce = document.getElementsByClassName('head1');
	$(introduce[0]).fadeIn(2000);
	window.setTimeout(function(){
		$(introduce[1]).fadeIn(2000);
	},1500);
	window.setTimeout(function(){
		$(introduce[2]).fadeIn(2000);
	},3000);
	window.setTimeout(function(){
		$('.introduce-btn').fadeIn(2000);
	},4000);
});