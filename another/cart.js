$(function(){
	var account = [];//存储用户信息：0：用户名，1：密码，3：是否勾选"记住我"
	var _products = [];//存储购物车信息，第一个元素是用户名，后面元素对应一件购物车商品
	var checkboxs = [];//"商品栏"复选框
	
	//加载头部
	$.get("include/header.html",{},function(data){
		$(".header").append(data);
		//判断是否登录
		if($.cookie("login")){
			//将cookie中用户信息存入account待用
			account = $.cookie("login").split("=");
			$(".header").find("a").remove().parent();
			$(".include").append(account[0]);
		}
	});
	//加载尾部
	$.get("include/footer.html",{},function(data){
		$(".footer").append(data);
	});
	
	//加载购物车列表
	if(!$.cookie("products")){//cookie中无购物车缓存
		//提示购物车为空
		$("tbody").html(`<span style = "padding-left:10px; display:inline-block; height: 50px; line-height:50px">购物车为空</span>`);
	}else{//cookie中有缓存
		/*在页面中显示购物车中信息*/
		// 获取cookie中购物车信息
		_products = JSON.parse($.cookie("products"));
		/* ？？？？？？？？？？？？？？？？？能否不需更正格式？？？？？？？？？？？？？？？？？？？？？？ */
		if(typeof _products[0] == "string"){
			// 将第1个元素(用户名)移除
			_products.shift();
		}else{
			//将cookies更正为正确的格式
			refreshProductsCookie(_products);
		}
		// 构建模板
		var html = template("cart_template", {products:_products});
		// 渲染模板
		$("tbody").html(html);
		
		/* 获取“商品栏”复选框对象并初始化 */
		// 获取“商品栏”复选框
		checkboxs = $(".check");
		// 设置“商品栏”复选框的勾选状态
		$.each(_products,function(index,curVal){
			if($(curVal).prop("checked") == true)
				$(checkboxs[index]).prop("checked",true);
		});
	}
	//计算“共计”金额
	totalAmountFun();
	//初始化"全选"复选框状态
	controlSelectAll();
	
	/********************从购物车移除商品********************/
	$("tbody").delegate(".del","click",function(){
		var tr = $(this).parents("tr");
		if(_products.length == 1){
			//提示购物车为空
			$("tbody").html(`<span style = "padding-left:10px; display:inline-block; height: 50px; line-height:50px">购物车为空</span>`);
			//更改全选复选框状态
			$("#selectAll").prop("checked",false);
			//将数组置为空
			_products = [];
			//移除products的cookies
			$.removeCookie("products",{path:"/"});
		}else{
			$.each($(_products),function(index,curVal){
				if($(tr).find(".id").val() == curVal.pro_id){
					//从_products数组中移除该商品
					_products.splice(index,1);
				}
			});
			//更新Cookie
			refreshProductsCookie(_products);
		}
		
		//从DOM中移除元素
		$(tr).remove();
		//计算“共计”金额
		totalAmountFun();
		//刷新"全选"复选框状态
		controlSelectAll();
	});
	
	/********************商品数量+/-********************/
	$("tbody").delegate("input[type='button']","mouseup",function(){
		//获取当前点击行
		var tr = $(this).parents("tr");
		//遍历_products
		$.each($(_products),(index,curVal)=>{
			if($(tr).find(".id").val() == curVal.pro_id){//找到匹配行
				if($(this).val()=="+")//若点击按钮的值为"+"
					_products[index].number++;
					
				else{//若点击按钮的值为"-"
					if($($(".num")[index]).val()>1)//限制数量不少于1
						_products[index].number--;
				}
				//修改DOM元素
				$(tr).find(".num").val(_products[index].number);//数量
				$(tr).find("td:nth-child(6)").text(_products[index].number*_products[index].price);//小计
				
				//若修改数量时该物品未被选中，则勾选
				if(!$(tr).find(".check").prop("checked")){
					//修改"商品栏"复选框选择状态
					_products[index].checked = $(tr).find(".check").prop("checked");
					//修改DOM元素选择状态	
					$(tr).find(".check").prop("checked",true);
					//重新判断全选复选框状态
					controlSelectAll();
				}
			}
		});
		
		//重新计算总额
		totalAmountFun();
		//更新Cookie
		refreshProductsCookie(_products);
	});
	
	/********************计算并显示"总计"********************/
	function totalAmountFun() {
		//初始化
		var totalAmount = 0;
		//因移除操作导致checkboxs与当前状态不一致，需要重新获取复选框对象
		checkboxs = $("tbody .check");
		//获取“商品栏”复选框个数
		var len = checkboxs.length;
		for(let i = 0; i < len; i++) {
			//若某对象的复选框为勾选状态，则将小计金额算入总额
			if($(checkboxs[i]).prop("checked") == true)
				totalAmount += Number($(checkboxs[i]).parents("tr").find("td:nth-child(6)").text());
		}
		//保留2位小数
		totalAmount = totalAmount.toFixed(2);
		//显示“总计”
		$("#totalAmount").text(totalAmount);
	}

	/********************控制"商品栏"复选框状态********************/
	$("tbody").delegate(".check","click",function(){
		//获取当前点击行
		var tr = $(this).parents("tr");
		//修改该复选框状态
		$.each($(_products),(index,curVal)=>{
			if($(tr).find(".id").val() == curVal.pro_id){//匹配到当前行
				//当前勾选状态
				var status = $(this).prop("checked");
				//修改数组中勾选状态
				_products[index].checked = status;
			}
		});
		//更新Cookie
		refreshProductsCookie(_products);
		//计算“共计”金额
		totalAmountFun();
		//刷新"全选"复选框状态
		controlSelectAll();
	});
	/********************全选********************/
	$("#selectAll").click(function(){
		var status = $("#selectAll").prop("checked");
		checkboxs.prop("checked",status);
		$.each(_products,function(index,curVal){
			curVal.checked = status;
		});
		//更新Cookie
		refreshProductsCookie(_products);
		//计算“共计”金额
		totalAmountFun();
	})
	/********************"全选"复选框根据删除、复选框状态动态修改自身状态********************/
	function controlSelectAll(){
			var status = true;
			$.each($(".check"), function(index,curVal) {
				if(!$(curVal).prop("checked"))//若有未勾选的“商品栏”复选框，则
					status = false;
			});
			//修改全选按钮状态
			$("#selectAll").prop("checked",status);
		}
	/********************清空购物车********************/
	$("#deleteAll").click(()=>{
		if(confirm("是否确认清除购物车所有项？")){
			//提示购物车为空
			$("tbody").html(`<span style = "padding-left:10px; display:inline-block; height: 50px; line-height:50px">购物车为空</span>`);
			//重置"总计"
			$("#totalAmount").text("0.00");
			//更改全选复选框状态
			$("#selectAll").prop("checked",false);
			//将数组置为空
			_products = [];
			//更新Cookie
			$.removeCookie("products",{path:"/"});
		}
	});
	/********************根据_products更新Cookie内容********************/
	function refreshProductsCookie(_products){
		_products.unshift(account[0]);
		$.cookie("products",JSON.stringify(_products),{path:"/",expires:7});
		_products.shift();
	};
});
	