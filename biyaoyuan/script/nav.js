$(function(){
	//导航栏和吸顶移入移出的效果
	$('.nav_lastli').on('mouseenter',function(event){
		event.stopPropagation();
		if($(this).find('a').text() == '更多'){
			$(this).find('a').html('返回<img src="img/nav/nav-down.png"/>');
			$('.disappear').stop().animate({"top":-52},1000);
			$('.app_last').stop().animate({"top":0},1000,function(){
			});
		}else{
			$(this).find('a').html('更多<img src="img/nav/nav-up.png"/>');
			$('.disappear').stop().animate({"top":0},1000);
			$('.app_last').stop().animate({"top":52},1000,function(){
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
})

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
