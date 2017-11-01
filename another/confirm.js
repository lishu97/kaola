$(function(){
	//异步加载省份信息
	$.when(
		$.ajax("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1"),
		$.ajax("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2")
	).then(function(data1,data2){
		console.log(data1,data2);
		var html = "<option value='-1'>请选择省份</option>";
		data1[0].showapi_res_body.data.forEach(function(province){
			html +=`<option value="${province.id}">${province.areaName}</option>`;
		});
		data2[0].showapi_res_body.data.forEach(function(province){
			html +=`<option value="${province.id}">${province.areaName}</option>`;
		});
		$("select[name='province']").html(html);
	});
	$("select[name='province']").change(function(){
		var _parentId = $(this).val();
		if(_parentId == -1)
			return;
		var url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
		var html = "<option value='-1'>请选择城市</option>";
		$.getJSON(url,function(data){
			console.log(data);
			data.showapi_res_body.data.forEach(function(city){
				html += `<option value="${city.id}">${city.areaName}</option>`;
			});
			$("#city").html(html);
		});
	});
});
