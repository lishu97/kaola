$(function(){
	//加载头部
	$.get("include/header.html",{},function(data){
		$(".header").append(data);
	});
	//加载尾部
	$.get("include/footer.html",{},function(data){
		$(".footer").append(data);
	});
	//记住我功能
	if($.cookie("login")){//若存在Login的cookie
		var account = $.cookie("login").split("=");
		if(account[1]){//从cookie读取帐号密码，默认勾选记住
			$("#username").val(account[0]);
			$("#password").val(account[1]);
			$("#remember").prop("checked",true);
		}else{//清空输入框帐号密码，默认不勾选记住项
			$("#username").val();
			$("#password").val();
			$("#remember").prop("checked",false);
		}
	}else{//清空输入框帐号密码，默认不勾选记住项
		$("#username").val();
		$("#password").val();
		$("#remember").prop("checked",false);
	}
	//绑定登录按钮
	$("#login").click(function(){
		$.post("php/login.php",{username : $("#username").val(), password : $("#password").val()},function(data){
			if(data.status == 1){
				//登录状态存入cookie
				if($("#remember").prop("checked"))//连同密码一起存入cookie
					$.cookie("login",$("#username").val() + "=" + $("#password").val(),{path:"/",expires:7});
				else//只存用户名，不存密码
					$.cookie("login",$("#username").val(),{path:"/"});
				//页面跳转倒计时
				var i = 4;
				setInterval(()=>{
					if(!i--)
						location = "selectProducts.html";
					else
						$("#info").text("登录成功！" + i + "秒后跳转到商品界面...");
				},1000);
			}else{
				$("#info").text("用户名或密码错误！");
			}
		},"json");
	});
	
});
