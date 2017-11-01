$(function(){
	var products = [];
	var cartList = [];
	var cookies_login = $.cookie("login");
	var cookies_products = $.cookie("products");
	//加载头部
	$.get("include/header.html",{},function(data){
		$(".header").append(data);
		//判断是否登录
		if($.cookie("login")){
			var account = cookies_login.split("=");
			$(".header").find("a").remove().parent();
			$(".include").append(account[0]);
		}
	});
	//加载尾部
	$.get("include/footer.html",{},function(data){
		$(".footer").append(data);
	});
	//加载商品项
	$.get("php/allProducts.php",{},function(data){
		$.each(data.products,function(index,curVal){
			products.push(curVal);
			$("#template").clone(false,true)
							.attr("id","")
							.css("display","block")
							.find("img").attr("src",curVal.imgSrc).end()
							.find(".name").text(curVal.title).end()
							.find(".price").text(Number(curVal.price).toFixed(2)).end()
							.find(".id").val(curVal.pro_id).end()
							.appendTo($("#proContainer"));
		});
	},"json");
	//判断当前是否有用户登录
	if($.cookie("login")){
		var account = cookies_login.split("=");
		cartList.push(account[0]);
	}else{
		cartList.push(undefined);
	}
	//若有cookie，同步cartList与cookie中数据
	if($.cookie("products")){
		var arrTemp = JSON.parse($.cookie("products"));
		arrTemp.shift();
		$.each(arrTemp, function(index,curVal) {
			cartList.push(curVal);
		});
	}
	console.log(cartList);
	//加入到购物车
	$("#proContainer").delegate("a","click",function(){
		//遍历点击元素与所有商品
		$.each(products,(index,curVal)=>{
			//若找到匹配元素和商品
			if(curVal.pro_id == $(this).parents("li").find(".id").val()){
				var flag;//标记商品下标
				if(!$.cookie("products"))//没有cookie
					flag = -1;
				else{//有cookie
					var arrTemp = JSON.parse($.cookie("products"));
					arrTemp.shift();
					//查找cookie中是否存在该商品，并返回该商品序号
					flag = haveIt(arrTemp,curVal.pro_id);
				}
				//判断购物车中是否已有该商品
				if(flag == -1){//cookie中没有这件商品
					var cart = {
						pro_id : curVal.pro_id,
						imgSrc : curVal.imgSrc,
						title : curVal.title,
						price : curVal.price,
						number : 1,
						checked : true
					}
					cartList.push(cart);
				}
				else{//cookie中有这件商品
					cartList[flag+1].number++;
				}
			}
		});
		console.log(cartList);
		$.cookie("products",JSON.stringify(cartList),{expires:7,path:"/"});
	});
	function haveIt(arr,ele){
		var i = -1;
		$.each(arr,(index,curVal)=>{
			curVal = curVal.pro_id || curVal;//若curVal为一个对象，取其id
			if(curVal == ele){
				i = index;
				return;
			}
		})
		return i;
	}
});
