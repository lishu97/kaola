$(function(){
	//加载头部
	/*$.get("include/header.html",{},function(data){
		$("#header").append(data);
	});*/
	$.when(
		$.ajax("include/header.html")
	).then(function(data){
			$("#header").append(data);
			$("#header .hover").hover(function(){
				$(this).find(".hidder").show();
			},function(){
				$(this).find(".hidder").hide();
			});
	});
});
	