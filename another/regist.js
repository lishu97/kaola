$(function(){
	//加载头部
	$.get("include/header.html",{},function(data){
		$(".header").append(data);
	});
	//加载尾部
	$.get("include/footer.html",{},function(data){
		$(".footer").append(data);
	});
	//失去焦点时判断用户名是否已经存在
	var usernameExist = true;
	$("#username").blur(function(){
		$.ajax({
			type : "get",
			url : "php/check.php",
			data : {username : $(this).val()},
			dataType : "json",
			success : function(data){
				if (data.status == 0){
					$("#username_info").text("用户名已被占用");
					usernameExist = true;
				} else {
					$("#username_info").text("用户名可用");
					usernameExist = false;
				}
			}
		});
	});
	//注册
	$("#regist").click(function(){
		//若用户名已经存在，则不提交到服务器
		if(!usernameExist){
			$.post("php/register.php",{username : $("#username").val(), password : $("#password").val(), phone : $("#phone").val()},function(data){
				if(data.status == 1){//注册成功
					$("#info").text("注册成功！3秒后跳转到登录界面...");
					setTimeout(()=>{
						location = "login.html";
					},3000);
				}else{//注册失败
					$("#info").text("注册失败！请稍后再试...");
				}
			},"json");
		}
	});
});
