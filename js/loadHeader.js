//加载头部
define(["jquery"],function($){
	$.when(
		//请求头部文件
		$.ajax("include/header.html")
	).then(function(data){
			//加载头部html
			$("#header").append(data);
			//头部实现下拉列表
			$("#header .hover").hover(function(){
				$(this).find(".hidder").show();
			},function(){
				$(this).find(".hidder").hide();
			});
	});
});