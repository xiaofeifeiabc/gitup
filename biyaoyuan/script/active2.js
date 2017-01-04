$(function(){
	var goods_act = $.cookie("goods_id") - 1;
		//goods_act++
	console.log(goods_act)
	$.ajax({
		url:"../json/list/active.json",
		type:"GET",
		success:function(res){
			//console.log("我是跳转之后的页面");
			//console.log(res);
			var act_html2 = "";
			var acr_pro1 = "";
			/*act_html2 = "<dl id='"+res[goods_act].id+"'><a href='###'><img src='" + res[goods_act].src + "'width='285px' /></a><dt>" + res[goods_act].name + "</dt><dd>" + res[goods_act].price + "</dd></dl>";
			$(".act_goods2").html(act_html2);*/
			act_pro1 = '<a href="../index.html">首页</a>/<em>'+res[goods_act].name+'</em><span>百分时装 iBuyFun</span><i>9533859</i><a class="lx" href="###">联系客服</a>';
			act_html2 = '<div class="pro_left" id="'+res[goods_act].id+'"><div class="big"><img src="'+res[goods_act].src+'"/><img src="../img/product/2.jpg"/><img src="../img/product/3.jpg"/><img src="../img/product/4.jpg"/><img src="../img/product/5.jpg"/><div id="box"></div></div><div id="mark"></div><div class="small"><a href="javascript:;"><img src="'+res[goods_act].src+'"/></a><a href="javascript:;"><img src="../img/product/2.jpg"/></a><a href="javascript:;"><img src="../img/product/3.jpg"/></a><a href="javascript:;"><img src="../img/product/4.jpg"/></a><a href="javascript:;"><img src="../img/product/5.jpg"/></a></div><div class="b_big"><img src="'+res[goods_act].src+'"/><img src="../img/product/2.jpg"/><img src="../img/product/3.jpg"/><img src="../img/product/4.jpg"/><img src="../img/product/5.jpg"/></div></div><div class="pro_right"><h3>'+res[goods_act].name+'</h3><p class="first_p">两粒扣长款大衣，修身立体剪裁</p><p class="line"></p><div><p>售价<em>￥<span>'+res[goods_act].price+'</span></em>生产周期：15天</p><p>颜色<a class="images1 l" href="javascript:;"><img src="../img/product/small1.png" alt="打不开此图片" title="橘红色"/></a><a class="images2" href="javascript:;"><img src="../img/product/small2.png" alt="打不开此图片" title="墨绿色"/></a><a class="images3" href="javascript:;"><img src="../img/product/small3.png" alt="打不开此图片" title="驼色"/></a><a class="images4" href="javascript:;"><img src="../img/product/small4.png" alt="打不开此图片" title="黑色"/></a></p><p>尺寸<a class="l mar_r" href="javascript:;">XS</a><a href="javascript:;">S</a><a href="javascript:;">M</a><a href="javascript:;">L</a><a href="javascript:;">XL</a></p><a href="javascript:;">查看尺码对照表</a><p class="n">数量<span><a class="cut" href="javascript:;">-</a><span>1</span><a class="add" href="javascript:;">+</a></span></p><a class="addcar" href="javascript:;"><b></b>加入购物车</a></div><p><i>7天无忧退换</i><i>先行赔付</i><i>超时赔偿</i><i>全场包邮</i></p></div>';
			$(".act_pro").html(act_pro1);
			$(".act_goods2").html(act_html2);
	//商品图
	$(".act_goods2 .pro_left .big img").eq(0).css({"display":"block"}).siblings().css({"display":"none"});
	$(".act_goods2 .pro_left .b_big img").eq(0).css({"display":"block"});
	$(".act_goods2 .pro_left .small a").eq(0).css({"border":"1px solid #b768a5"}).siblings().css({"border":"1px solid #ccc"});
	$(".act_goods2 .pro_left .small a").click(function(){
		var $index = $(this).index();
		console.log(888888);
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
		}
	});

	$('.pro_img .top a').eq(0).on('click',function(){
		//console.log(8888);
		$('.pro,.pdu,.question').css('display','block');
		$('.est').css('display','none')
		$(this).removeClass('aa').addClass('aa').siblings().removeClass('aa');
	});
	$('.pro_img .top a').eq(1).on('click',function(){
		$('.est').css('display','block');
		$('.pro,.pdu,.question').css('display','none');
		$(this).removeClass('aa').addClass('aa').siblings().removeClass('aa');



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
