$(function(){
	//console.log("我是活动页");
	//手机app
	$("#header .header1 .tou1").hover(function(){
		$("#header .header1 .tou1 span").css({"display":"block"});
	},function(){
		$("#header .header1 .tou1 span").css({"display":"none"});
	});
	//导航滚动时定位到页面顶端
	document.onscroll = function(){
		var scroll = document.documentElement.scrollTop || document.body.scrollTop;
		if(scroll > 70){
			$("#nav").addClass("retract");
			$("#nav .all").hide();
			$("#back p").show();
		}else if(scroll < 70){
			$("#nav").removeClass("retract");
			$("#nav .all").show();
			$("#back p").hide();
		}
	};
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
	//回到顶部
	$("#back span img").eq(1).css({"display":"none"});
	$("#back span").hover(function(){
		$('#back span img').css({"display":"none"}).eq(1).css({"display":"block"});
		$("#back div").css({"display":"block"});
	},function(){
		$('#back span img').css({"display":"block"}).eq(1).css({"display":"none"});
		$("#back div").css({"display":"none"});
	})
	$("#back p").click(function(){
		$("body,html").animate({"scrollTop":"0"},300);
	});
	//轮播图
	var act_index = 0;
	var $act_wrap = $(".wrap");
	var $act_img = $(".wrap img");
	//console.log($act_img);
	var clone_img = $act_img.eq(0).clone();
	$act_wrap.append(clone_img);
	var $act_oimg = $(".wrap img");
	var $act_timer;
	clearInterval($act_timer);
	$act_timer = setInterval(function(){
		//console.log("我是定时器");
		//console.log(999);
		//console.log($act_wrap)
		if(act_index == $act_oimg.length - 1){
			act_index = 1;
			$act_wrap.css("marginLeft",0);
		}else{
			act_index++;
		}
		$act_wrap.stop().animate({

			marginLeft: - $act_oimg.width() * act_index
		});
		//console.log($act_oimg.width())
	},3000);
	//console.log($act_oimg);
	//点击右键的时候让图片进行切换
	$(".banner").on('click','.banr',function(){
		//console.log(1111);
		if(act_index == $act_oimg.length - 1){
			act_index = 1;
			$act_wrap.css("marginLeft",0);
		}else{
			act_index++;
		}
		$act_wrap.stop().animate({
			marginLeft: - $act_oimg.width() * act_index
		});
	});
	//点击左键的时候，图片进行切换
	$(".banner").on("click",'.banl',function(){
		//console.log("我是事件委托的对象");
		if(act_index == 0){
			console.log("kjo");
			act_index = $act_oimg.length - 1;
			$act_wrap.css("marginLeft","-7200px");
			$act_wrap.stop().animate({
				marginLeft: - $act_oimg.width()*(act_index-1)
			});
		}else{
			act_index--;
			$act_wrap.stop().animate({
				marginLeft: - $act_oimg.width() * act_index
			});
		}	
	});
	//当鼠标移入图片上的时候，定时器停止
	$act_wrap.on("mouseenter",function(){
		clearInterval($act_timer);
	});
	//当鼠标移出图片的时候定时器开启
	$act_wrap.on("mouseleave",function(){
		$act_timer = setInterval(function(){
			//console.log("我是定时器");
			//console.log(999);
			//console.log($act_wrap)
			if(act_index == $act_oimg.length - 1){
				act_index = 1;
				$act_wrap.css("marginLeft",0);
			}else{
				act_index++;
			}
			$act_wrap.stop().animate({

				marginLeft: - $act_oimg.width() * act_index
			});
			console.log($act_oimg.width())
		},3000);
	});
	/*倒计时*/
	function timer(){
		var endTime = new Date('2017/1/1 00:00:00');
		var startTime = new Date();
		var cenTer = endTime.getTime() - startTime.getTime();
		var day=0,
			hour=0,
			minute=0,
			second=0;//时间默认值		
		if(cenTer > 0){
			day = Math.floor(cenTer / 1000 / 60 / 60 / 24);
			hour = Math.floor(cenTer / 1000 / 60 / 60 % 24);
			minute = Math.floor(cenTer / 1000 / 60 % 60);
			second = Math.floor(cenTer / 1000 % 60);
		}
		if (minute <= 9){
			minute = '0' + minute;
		}
		if (second <= 9){
			second = '0' + second;
		}
		$('#day_show').html(day+"天");
		$('#hour_show').html('<s id="h"></s>'+hour+'时');
		$('#minute_show').html('<s></s>'+minute+'分');
		$('#second_show').html('<s></s>'+second+'秒');
	}
	setInterval(timer,0);
	/*活动页面列表页*/
	$(".act_list").on("click","dl",function(){
		var id = $(this).attr('id');
		$.cookie("goods_id",id);
		console.log(typeof ($.cookie("goods_id")))
		console.log($.cookie("goods_id"));
		window.location.href = "active2.html";
	});
	getMessages(32);
	function getMessages(num){
		$.ajax({
			url:"../json/list/active.json",
			type:"GET",
			success:function(res){
				//console.log(res);
				var show_num = num;
				var resL = res.length;
				var page_Num = Math.ceil(resL / show_num);
				$("#Pagination").pagination(page_Num,{
					items_per_page:1,//一页显示几条
					num_display_entries:4,//连续显示几条
					current_page:0,
					num_edge_entries:3,//两侧分别显示几条
					link_to:"#",
					prev_text:"上一页",
					next_text:"下一页",
					ellipse_text:"...",
					prev_show_always:true,
					next_show_always:true,
					callback:function(index_act){
						//console.log(11111111111111111);
						var act_html = "";
						for(var i = show_num * index_act;i < show_num * (1 + index_act) ;i ++ ){
							if(i < res.length){
								act_html += "<dl id='"+res[i].id+"'><a href='"+res[i].href+"'><img src='" + res[i].src + "'width='285px' /></a><dt>" + res[i].name + "</dt><dd>￥" + res[i].price + "</dd></dl>";
							}
						}
						$(".act_goods").html(act_html);
					}
				})
				//console.log($(".active_list .act_list .act_goods").children());
				//console.log($(".act_goods dl"));
				$(".act_goods dl img").on('mouseenter',function(){
					//console.log("我存在于.act-goods中");
					$(this).stop().animate({
						"width":"290px",
						"marginLeft":"-5px"
					},300);
					$(this).parents("dl").css("box-shadow","0 0 8px #ccc");
				});
				$(".act_goods dl img").on("mouseleave",function(){
					$(this).stop().animate({
						"width":"285px",
						"marginLeft":"0"
					});
					$(this).parents("dl").css("box-shadow","0 0 0 white");
				});
			}
		});
	}
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