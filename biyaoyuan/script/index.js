window.onload = function(){
	//首页
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
	//nav 导航
	//左边导航  移出动画
	$('.nav_left li').each(function(i){
		$(this).mouseover(function(event){
			//console.log('运动');
			$('.nav_left .details').eq(i).css("display","block");
			//event.stopPropagation();
			$('.nav_left .details').eq(i).stop().animate({"left":"180px"},300);
		})
		$(this).mouseout(function(){
			$('.nav_left .details').eq(i).css("display","none");
			$('.nav_left .details').eq(i).stop().animate({"left":"160px"},300);
		});
	})
	//轮播图
	var $oimg = $('.ban_img').find('img');
	var indeX = 0;
	var inDex = 0;
	var $radios = $(".ban_nav a");
	//console.log($radios);
	var $timer
	//console.log($oimg);
	//鼠标移入定时器停止
	$('.ban_img').on('mouseenter',function(){
		clearInterval($timer);
	});
	//鼠标移出定时器开始
	$('.ban_img').on('mouseleave',function(){
		changeer();
	});
	//图片轮播的函数
	function changeer(){
		clearInterval($timer);
		$timer = setInterval(function(){
			//console.log(inDex + 1)
			inDex ++;
			if(inDex > $oimg.length - 1){
				inDex = 0;
			}
			indeX ++;
			if(indeX > $radios.length - 1){
				indeX = 0;
			}
			//$oimg.eq(++indeX%($oimg.length) - 1).fadeIn(600).siblings().fadeOut(600);
			//$radios.eq(++indeX%($oimg.length) - 1).css({"background":"#523669"},600).siblings().css({"background":""},600);
			tabImg();
		},2000);
	}
	changeer();
	function tabImg(){
		//图片淡入淡出
		//changeer();
		$oimg.eq(indeX).fadeIn(600).siblings().fadeOut(600);
		//console.log(index);
		//小圆点的变化
		$radios.eq(inDex).css({"background":"#523669"},600).siblings().css({"background":""},600);
	}
	//小圆点 点击事件
	$radios.each(function(i){
		$(this).click(function(){
			//改变下标
			inDex = $(this).index();
			indeX = $(this).index();
			tabImg();
			clearInterval($timer);
			changeer();
		});
	});
	$(".ban_img").on("click","img",function(){
		window.location.href = "html/active.html";
	});
	//手风琴 news
	function news(){
		var $oa = $(".news a");
		//console.log($oa);
		for(var i = 0;i < $oa.length;i ++){
			$oa.eq(0).addClass("frist");
		}
		//手风琴	移入移出效果
		$oa.hover(function(){
			//console.log(1);
			$(this).stop(true).animate({"width":"600px"},1000).siblings().stop(true).animate({"width":"115px"},1000);
		
		},function(){
			$(this).find('.first').stop(true).animate({"width":"600px"},1000).siblings().stop(true).animate({"width":"115px"},1000);
		});	
	}
	news();
	//当页面加载到一定时间的时候，加载更多
	$(document).on('scroll',function(){
		var $scrtop = $(document).scrollTop();
		//console.log($scrtop);
		/*var $cornaX = $('.category-ornament').offset().top;
		var $cH = document.documentElement.clientHeight || document.body.clientHeight;*/
		//console.log($cH);
		//console.log($cornaX);
		//console.log($cornaX+$cH);
		//var $gao = $cornaX + $cH;
		if($scrtop > 7450 ){
			$('.category-scroll').animate({
				'fontSize':'12px'
			},1000).css('display','none');
			var timerscroll = setInterval(function(){
				$('.category-ornament').css('display','block');
				$('.category-cosmetics').css('display','block');
				$('.category-nurse').css('display','block');
				$('.category-house').css('display','block');
				$('.category-kitchen').css('display','block');
				$('.category-furniture').css('display','block');
			});
		}
	});
	//console.log('lc')
	if($.cookie('id'))
	welcome();
	//console.log('lc')
	var isTrue = true;
	function welcome(){
		//console.log(111);
		var $zhuxiao = $("<li><a href='###'>注销</a></li>");
		//console.log($('.header2 li').eq(0).html());
		if($.cookie('id')=='undefined'){
			console.log($.cookie('id'))
		
		/*if(eval($.cookie('id'))==""){
			$('.header2 li').eq(1).before("<li></li>");
			isTrue = false;
		}*/
		}else{
			var $log_txt = eval($.cookie('id'))
			isTrue = false;
			$('.header2 li').eq(0).html("欢迎回来:"+$log_txt);
			//console.log($('.header2 li').eq(1).html());
			$('.header2 li').eq(1).before($zhuxiao);
			$zhuxiao.on('click',function(){
				console.log(000);
				$('.header2 li').eq(0).html("<li>欢迎来到必要，请<a href='html/login.html'>登录</a></li>");
				$(this).css('display','none');
				$.removeCookie('id',{path:'/'});
			});}
		/*if(eval($.cookie('id')) == ""){
			$('.header2 li').eq(0).html("<li>欢迎来到必要，请&nbsp;&nbsp;<a href='html/login.html'>登录</a></li>");
			$('.header2 li').eq(1).html("<li class='reg'><a href='html/registered.html'>注册</a></li>");
		}else{
			var $log_txt = eval($.cookie('id'))
			$('.header2 li').eq(0).html("<li>欢迎回来：<a href='html/login.html'>"+$log_txt+"</a>");
			//console.log($('.header2 li').eq(1).html());
			$('.header2 li').eq(1).after("<li><a href='html/login.html' class='zhuxiao'>注销</a></li>");
			$('.zhuxiao').on('click',function(){
				$(this).parent().css('display','none');
			});
		}*/
		//$('.header2 li').eq(0).html("<li>欢迎来到必要，请&nbsp;&nbsp;<a href='html/login.html'>登录</a></li>");
		//$('.header2 li').eq(1).html("<li class='reg'><a href='html/registered.html'>注册</a></li>");
	}
}