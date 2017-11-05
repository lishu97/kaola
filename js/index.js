//requirejs
require(["config"], function(){	
	require(["jquery"],function($){
		//引入header
		require(["loadHeader"], function(){
			//引入轮播图插件
			require(["coursel","htmlCoursel"],function(){
				//生成轮播图
				$("#banner").carousel({
					target : $("#container #motherAndBaby .container .right .carousel"),
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
					target : $("#container #motherAndBaby .container .right .carousel"),
					width : 240,
					height : 400,
					pages : [
						`<dl>
							<dt><img src='img/index/motherAndBaby_carousel1.jpg'/></dt>
							<dd>
								<a>Daiso 大创 粉扑专用清洗剂 80毫升 平价</a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd></dl>
							<dl><dt><img src='img/index/motherAndBaby_carousel2.jpg'/></dt>
							<dd>
								<a>Balea 芭乐雅 玻尿酸浓缩精华原液安瓶</a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd></dl>
							<dl><dt><img src='img/index/motherAndBaby_carousel3.jpg'/></dt>
							<dd>
								<a>Naturie imju 薏仁美白保湿防晒化妆水 </a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd>
						</dl>`,
						`<dl>
							<dt><img src='img/index/motherAndBaby_carousel3.jpg'/></dt>
							<dd>
								<a>Naturie imju 薏仁美白保湿防晒化妆水 </a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd></dl>
							<dl><dt><img src='img/index/motherAndBaby_carousel2.jpg'/></dt>
							<dd>
								<a>Balea 芭乐雅 玻尿酸浓缩精华原液安瓶</a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd></dl>
							<dl><dt><img src='img/index/motherAndBaby_carousel1.jpg'/></dt>
							<dd>
								<a>Daiso 大创 粉扑专用清洗剂 80毫升 平价</a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd>
						</dl>`,
						`<dl>
							<dt><img src='img/index/motherAndBaby_carousel2.jpg'/></dt>
							<dd>
								<a>Balea 芭乐雅 玻尿酸浓缩精华原液安瓶</a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd></dl>
							<dl><dt><img src='img/index/motherAndBaby_carousel1.jpg'/></dt>
							<dd>
								<a>Daiso 大创 粉扑专用清洗剂 80毫升 平价</a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd></dl>
							<dl><dt><img src='img/index/motherAndBaby_carousel3.jpg'/></dt>
							<dd>
								<a>Naturie imju 薏仁美白保湿防晒化妆水 </a>
								<span class="curPrice">￥36</span>
								<span class="prePrice">￥48</span>
							</dd>
						</dl>`,
					],
					shiftTime: 3000,
					isPrevNext : false,
					isAuto : false,
				});
				//引入footer
				require(["loadFooter"], function(){
					
				});
			});
		});
	});
});
