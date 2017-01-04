$(function(){
	//列表 list_1
	$.getJSON('../json/list/list_1.json',function(data){
		json = data;
		list('1');
	});
	//list_2
	$.getJSON('../json/list/list_2.json',function(data){
		json = data;
		list('2');
	});
	//list_3
	$.getJSON('../json/list/list_3.json',function(data){
		json = data;
		list('3');
	});
	//加载方法
	function list(category){
		var img = '';
		var imgName = '';
		var imgMoney = '';
		var dl = '';
		for(var i = 0;i < json.length;i ++){
			dl = '<dl></dl>';
			$(".list_" + category + " .goods").append(dl);
			img = '<a href="' + json[i].href + '"><img src="' + json[i].src + '"width="285px" /></a>';
			imgName = '<dt>' + json[i].name + '</dt>';
			imgMoney = '<dd>' + json[i].money + '</dd>';
			$(".list_" + category + " dl").eq(i).append(img);
			$(".list_" + category + " dl").eq(i).append(imgName);
			$(".list_" + category + " dl").eq(i).append(imgMoney);
			//console.log(img);
		}
		//列表页	
		var $list = $(".list_nav ul li");
		//console.log($list);
		$(".list_nav ul li a").eq(0).css({"color":"#333"});
		$(".list_nav ul li").click(function(){
			var i = $(this).index();
			var list = ".list_" + i;
			$(this).find("a").css({"color":"#333"}).parent().siblings().find("a").css({"color":"#999"});
			$(list).css({"display":"block"}).siblings().css({"display":"none"});
			//console.log('css');
		});

		$(".goods dl img").on('mouseenter',function(){
			//console.log("我存在于.act-goods中");
			$(this).stop().animate({
				"width":"290px",
				"marginLeft":"-5px"
			},300);
			$(this).parents("dl").css("box-shadow","0 0 8px #ccc");
		});
		$(".goods dl img").on("mouseleave",function(){
			$(this).stop().animate({
				"width":"285px",
				"marginLeft":"0"
			});
			$(this).parents("dl").css("box-shadow","0 0 0 white");
		});
	}
	$('.nav_lastli').on('mouseenter',function(event){
		event.stopPropagation();
		if($(this).find('a').text() == '更多'){
			$(this).find('a').html('返回<img src="../img/nav/nav-down.png"/>');
			$('.disappear').stop().animate({"top":-52},1000);
			$('.app_last_li').stop().animate({"top":0},1000,function(){
			});
		}else{
			$(this).find('a').html('更多<img src="../img/nav/nav-up.png"/>');
			$('.disappear').stop().animate({"top":0},1000);
			$('.app_last_li').stop().animate({"top":52},1000,function(){
			});
		}	
	});
	new Secon_lev.start($('.dis_li1'),$('.dis_ul1'))
	new Secon_lev.start($('.dis_li2'),$('.dis_ul2'))
	new Secon_lev.start($('.dis_li3'),$('.dis_ul3'))
	new Secon_lev.start($('.dis_li4'),$('.dis_ul4'))
	new Secon_lev.start($('.dis_li5'),$('.dis_ul5'))
	new Secon_lev.start($('.dis_li6'),$('.dis_ul6'))
	new Secon_lev.start($('.dis_li7'),$('.dis_ul7'))
	new Secon_lev.start($('.dis_li8'),$('.dis_ul8'))
	new Secon_lev.start($('.dis_li9'),$('.dis_ul9'))
	new Secon_lev.start($('.app_li1'),$('.app_ul1'))
	new Secon_lev.start($('.app_li2'),$('.app_ul2'))
	new Secon_lev.start($('.app_li3'),$('.app_ul3'))
});

// 网页的二级菜单实现
var  Secon_lev = {
	//传入包裹和显示的两个元素
	start : function(wrap,child){
	 	this.wrap = wrap;
	 	this.child = child;
	 	//console.log(this.wrap)
	 	Secon_lev.show(this);
	},
	show : function(that){
	 	that.isTrue = true;
	 	//console.log(that.wrap)
	 	that.wrap.on('mouseenter',function(){
			that.isTrue = true;
			that.child.css('display','block')
		}).on('mouseleave',function(){
			setTimeout(function(){
				if(that.isTrue){
					that.child.css('display','none')
				}
			},100);
		});
		that.child.mouseover(function(){
			that.isTrue = false;
			that.child.css('display','block')
		}).mouseout(function(){
			that.isTrue = true;
			that.child.css('display','none')
		}) 
	}
}
