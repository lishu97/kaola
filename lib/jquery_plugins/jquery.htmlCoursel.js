;
(function($){
	function htmlCarousel(options) {
		this.container = options.container; // 放置轮播图所有后代元素的容器
		this.width = options.width;
		this.height = options.height;
		this.pages = options.pages;
		this.len = this.pages.length;
		this.currentIndex = 0;
		this.nextIndex = 1;
		this.timer = null; // 自动轮播计时器
		this.isPrevNext = options.isPrevNext; // 是否允许向上/下翻页
		this.isAuto = options.isAuto; // 是否允许自动轮播
		this.shiftTime = options.shiftTime || 3000;
		this.type = options.type || "fade"; // 轮播方式

		this.init(); // 初始化
	}

	htmlCarousel.prototype = {
		constructor : htmlCarousel,
		init : function(){ // 动态创建所需要使用到的DOM结构
			$(this.container).css({
				position:"relative",
				width: this.width,
				height: this.height,
				overflow: "hidden"
			});
			
			// 动态创建 ul 添加待轮播切换的图片盒子
			var _ul = $("<ul class='pages'></ul>").appendTo(this.container);

			if (this.type === "fade") { // 淡入淡入式轮播
				$(_ul).css({
					listStyle:"none",
					width: this.width,
					height: this.height,
					margin:0,
					padding:0
				});
			} else if (this.type === "slide") { // 滑动轮播
				$(_ul).css({
					listStyle : "none",
					width:this.width * this.len,
					height:this.height,
					margin:0,
					padding:0,
					position: "absolute",
					left : 0,
					top : 0
				});
			}
			for (var i = 0, len = this.pages.length; i < len; i++) {
				var _page = this.pages[i];
				// 创建 li 元素
				var _li = $(`<li class='page'>
					${_page}
				</li>`);
				// 将 _li 添加到 ul 中
				_li.appendTo(_ul);
				if (this.type === "fade") { // 淡入淡入式轮播				
					_li.css({
						position:"absolute",
						top:0,
						left:0,
						display:"none"
					});
					if (i === 0)
						_li.show();
				} else if (this.type === "slide") { // 滑动轮播
					_li.css({
						float : "left"
					});
				}
			}

			// 添加小圆点
			var _circles = $("<div class='circles'></div>").appendTo(this.container);

			var html = "";
			for (i = 0; i < len; i++) {
				html += `<span>${i+1}</span>`;
			}
			_circles.html(html)
					.children().eq(0).prop("class","current");


			// 向上向下页
			if (this.isPrevNext) { // 有向上/下翻页的配置
				$("<div class='prev'>&lt;</div><div class='next'>&gt;</div>").appendTo(this.container);
			}
	
			// 注册事件监听
			this.registerEventListener();

			// 允许自动轮播
			if (this.isAuto) {
				this.auto();
			}
		},
		registerEventListener: function(){
			//自动轮播
			if (this.isAuto) {
				//鼠标进入停止轮播、移出开始轮播
				$(this.container).hover(()=>{
					clearInterval(this.timer);
				}, ()=>{
					this.timer = setInterval(()=>{
						this.move();
					}, this.shiftTime);
				});
			}
			// 鼠标移入小圆点
			var circles = $(".circles span");
			var that = this;
			circles.mouseover(function(){
				var index = $(this).index();
				if (that.currentIndex === index)
					return;
				that.nextIndex = index;
				that.move();
			});
			// 向上/向下
			if (this.isPrevNext) {
				$(".prev").click(()=>{
					this.nextIndex = this.currentIndex - 1;
					if (this.nextIndex < 0)
						this.nextIndex = this.pages.length - 1;
					this.move();
				})
				$(".next").click(()=>{
					this.move();
				});
			}
		},
		auto : function(){
			this.timer = setInterval(()=>{
				this.move();
			}, this.shiftTime);
		},
		move : function(){ // 轮播切换
			if (this.type === "fade") {
				this.fade();
			} else if (this.type === "slide") {
				this.slide();
			}
		},
		fade : function(){
			// 当前图片淡出，即将显示图片淡入
			var pages = $(".pages .page")
			pages.eq(this.currentIndex).stop().fadeOut();
			pages.eq(this.nextIndex).stop().fadeIn();

			// 小圆点
			$(".circles span").attr("class","");
			$(".circles span").eq(this.nextIndex).attr("class","current");
			

			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if (this.nextIndex >= this.pages.length)
				this.nextIndex = 0;
		},
		slide: function(){
			var _left = -1 * this.nextIndex * this.width;
			// 当前图片淡出，即将显示图片淡入
			$(".pages").stop().animate({left : _left});
			// 小圆点
			$(".circles span").prop("class","current");
			$(".circles span").eq(this.nextIndex).prop("class","");

			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if (this.nextIndex >= this.pages.length)
				this.nextIndex = 0;
		}
	}

	/*$.fn.carousel = function(options){
		options = options || {};
		options.container = this;
		new htmlCarousel(options);
	}*/

	$.fn.extend({
		htmlCarousel : function(options){
			options = options || {};
			options.container = this;
			new htmlCarousel(options);
		}
	});
})(jQuery);