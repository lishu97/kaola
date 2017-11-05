//requirejs
require(["config"], function(){	
	require(["jquery"],function($){
		//引入header
		require(["loadHeader"], function(){
			//引入轮播图插件
			require(["coursel","htmlCoursel"],function(){
				//生成轮播图
				$("#banner").carousel({
					width : $(window).width(),
					height : 400,
					imgs : [
						{src:"/kaola/img/index/banner1.jpg"},
						{src:"/kaola/img/index/banner2.jpg"},
						{src:"/kaola/img/index/banner3.jpg"},
						{src:"/kaola/img/index/banner4.jpg"},
						{src:"/kaola/img/index/banner5.jpg"},
					],
					imgWidth: 1920,
					shiftTime: 3000,
					isPrevNext : true,
					isAuto : true,
				});
				$("#container #motherAndBaby .container .right .carousel").htmlCarousel({
					width : 240,
					height : 340,
					pages : [
						`<dl>
							<dt><img src='img/index/motherAndBaby_carousel.jpg'/></dt>
							<dd>
								<p>NORDIC NATURALS 挪威1</p>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd>
						</dl>`,
						`<dl>
							<dt><img src='img/index/motherAndBaby_carousel.jpg'/></dt>
							<dd>
								<p>NORDIC NATURALS 挪威2</p>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd>
						</dl>`,
						`<dl>
							<dt><img src='img/index/motherAndBaby_carousel.jpg'/></dt>
							<dd>
								<p>NORDIC NATURALS 挪威3</p>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd>
						</dl>`,
					],
					imgWidth: 1920,
					shiftTime: 3000,
					isPrevNext : true,
					isAuto : true,
				});
				//引入footer
				require(["loadFooter"], function(){
					
				});
			});
		});
	});
});
