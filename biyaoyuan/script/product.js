$(function(){
	//product 商品详情页面
	$('.pro_img .top a').eq(0).on('click',function(){
		$('.pro,.pdu,.question').css('display','block');
		$('.est').css('display','none')
		$(this).removeClass('aa').addClass('aa').siblings().removeClass('aa');
	});
	$('.pro_img .top a').eq(1).on('click',function(){
		$('.est').css('display','block');
		$('.pro,.pdu,.question').css('display','none');
		$(this).removeClass('aa').addClass('aa').siblings().removeClass('aa');
	});
	/*$(".pro_main .pro_img .top a").eq(0).click(function(){
		$(".pro").css({"display":"block"});
		$(".est").css({"display":"none"});
		$(this).css({"borderBottom":"2px solid #523669"}).parent().siblings().css({"border":"none"});
	});
	$(".pro_main .pro_img .top a").eq(1).click(function(){
		$(".est").css({"display":"block"});
		$(".pro").css({"display":"none"});
		$(this).css({"borderBottom":"2px solid #523669"}).parent().siblings().css({"border":"none"});
	});*/
	//商品图
	$(".pro_left .big img").eq(0).css({"display":"block"}).siblings().css({"display":"none"});
	$(".pro_left .b_big img").eq(0).css({"display":"block"});
	$(".pro_left .small a").eq(0).css({"border":"1px solid #b768a5"}).siblings().css({"border":"1px solid #ccc"});
	$(".pro_left .small a").click(function(){
		var $index = $(this).index();
		$(this).css({"border":"1px solid #b768a5"}).siblings().css({"border":"1px solid #ccc"});
		$(".pro_left .big img").eq($index).css({"display":"block"}).siblings().css({"display":"none"});
		$(".pro_left .b_big img").eq($index).css({"display":"block"}).siblings().css({"display":"none"});
	});
	//放大镜
	$("#mark").hover(function(){
		$("#box").show();
		$(".pro_left .b_big").show();
	},function(){
		$("#box").hide();
		$(".pro_left .b_big").hide();
	})
	$("#mark").mousemove(function(e){
		var disX = e.pageX;
		var disY = e.pageY;
		var l = disX - $(".pro_left .big").offset().left - $("#box").width() / 2;
		var t = disY - $(".pro_left .big").offset().top - $("#box").height() / 2;
		//边界
		if(l < 0){
			l = 0;
		}else if(l > $(".pro_left .big").width() - $("#box").width()){
			l = $(".pro_left .big").width() - $("#box").width();
		}
		if(t < 0){
			t = 0;
		}else if(t > $(".pro_left .big").height() - $("#box").height()){
			t = $(".pro_left .big").height() - $("#box").height();
		}
		$("#box").css({"left":l,"top":t});
		//大图
		var pX = ($(".pro_left .b_big img").width() - $(".pro_left .b_big").width()) / ($(".pro_left .big").width() - $("#box").width());
		var pY = ($(".pro_left .b_big img").height() - $(".pro_left .b_big").height()) / ($(".pro_left .big").height() - $("#box").height());
		var $left = pX * l ;
		var $top = pY * t;
		//赋值
		$(".pro_left .b_big img").css({"left":-$left,"top":-$top});
	});
	//选颜色事件
	var onOff = true;
	$(".pro_right div p").eq(1).find("a").click(function(){
		$(this).removeClass('l').addClass('l').siblings().removeClass('l');
	});
	//选尺码事件
	var offOn = true;
	$(".pro_right div p").eq(2).find("a").click(function(){
		$(this).removeClass('l').addClass('l').siblings().removeClass('l');
	});
	//商品数量事件
	var $index = $(".pro_right div p>span span").text();
	$(".add").click(function(){
		$index ++;
		$(".pro_right div p>span span").text($index);
	});
	$(".cut").click(function(){
		if($index > 1){
			$index --;
			$(".pro_right div p>span span").text($index);
		}
	});
	loadCart();
	$(".addcar").click(function(){
		//颜色，尺码验证
		if(!onOff || !offOn){
			alert("请选择规格！");
		}else{
			//获取商品数量  添加到cookie
			//获取商品的id（用来区分不同的商品）
			var goodId = $(this).parent().attr("data-good-id");
			//获取商品的名称
			var goodName = $('.pro_right h3').html();
			//获取商品的价格
			var goodPrice = parseFloat($(".pro_right div p em span").html());
			//获取商品的个数
			var goodCount = parseInt($(".pro_right div .n span span").html());
			//alert(goodCount);
			//获取商品的图片src
			var goodSrc = $(".pro_left img").eq(0).attr("src");
			//alert(goodSrc);
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			//将字符串转成对象
			var cartObj = convertCartStrToObj(cartStr);
			//判断该商品是否已经在购物车中存在
			if(goodId in cartObj){
				//如果已存在，那么该商品的数量加获取的个数
				cartObj[goodId].num += goodCount;
			}else{
				//如果不存在，那么将新商品的信息存入
				cartObj[goodId] = {
					name : goodName,
					price : goodPrice,
					num : parseInt(goodCount),
					src : goodSrc
				};
			}
			//将新的购物车信息存回cookie
			//将对象转为字符串
			cartStr = convertObjToCartStr(cartObj);
			//存入cookie
			$.cookie("cart",cartStr,{expires : 7,path:"/"});
			location.href = "car.html";
		}
	});
	
	function convertCartStrToObj(cartStr){
		//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
		if(!cartStr){
			return {};
		}
		var goods = cartStr.split(":");
		var obj = {};
		for(var i = 0; i < goods.length; i ++){
			var datA = goods[i].split(",");
			//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
			obj[datA[0]] = {
				name : datA[1],
				price : parseFloat(datA[2]),
				num : parseInt(datA[3]),
				src : datA[4]
			}
		}
		return obj;
	}
	function convertObjToCartStr(obj){
		var cartStr = "";
		//遍历对象
		for(var id in obj){
			if(cartStr){
				cartStr += ":";
			}
			cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
		}
		return cartStr;
	}
	
	//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
	function loadCart(){
		//var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			//获取到购物车中所有商品的数量
			var total = 0;
			for(var id in cartObj){
				total += cartObj[id].num;
			}
		$(".nav .car a span").html(total);
	}
})