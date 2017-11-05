//加载尾部
define(["jquery"],function(){
	$.when(
		//请求头部文件
		$.ajax("include/footer.html")
	).then(function(data){
			//加载头部html
			$("#footer").append(data);
			//实现二维码展示
			$("#footer .hover").hover(function(){
				console.log($(this).find(".hidder"))
				$(this).find(".hidder").show();
			},function(){
				$(this).find(".hidder").hide();
			});
	});
})