$(function(){
	//console.log("我是购物车");
	var $cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	if(!$cartStr){//如果购物车里没有东西的时候，.cars要隐藏
		$(".null").css("display","block").siblings().css("display","none");
	}else{//如果购物车内有东西让.null隐藏
		$(".null").css("display","none").siblings().css("display","block");
		var $cartObj = convertCartStrToObj($cartStr);
		//给.cars中添加商品，用拼接的方法
		for(var id in $cartObj){
			//商品信息
			var goods_messages = $cartObj[id];
			console.log(goods_messages.src)
			var messages = '<li><input type="checkbox" /></li><li><a href="product.html"><img src="'+goods_messages.src+'"/></a></li><li class="infor"><h4>'+goods_messages.name+'</h4><span>颜色：橘红色</span><span>尺寸：S</span></li><li class="price">¥'+goods_messages.price+'</li><li class="count"><a class="cut" href="javascript:;">-</a><span>'+goods_messages.num+'</span><a class="add" href="javascript:;">+</a</li><li class="pack">普通包装（免费）</li><li class="total">¥'+goods_messages.price * goods_messages.num+'</li><li class="oper"><a href="javascript:;">×</a></li>';

			$(".cart .cars").append(messages);
		}
		//给购物车添加商品删除事件
		//当点击.oper中的a标签的时候，要将所选中的商品列表的大盒子删除
		$('.oper a').on('click',function(){
			//console.log("删除");
			//将商品信息删除、并声明一个新的id（商品）；
			var id = $(this).parents(".cart").remove().attr("data-good-id");
			//console.log(id)
			var $cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var $cartObj = convertCartStrToObj($cartStr);
			//将删除的商品信息从cookie中删除；
			delete $cartObj[id];
			//将新的商品信息放回cookie
			$.cookie("cart",convertObjToCartStr($cartObj),{
				expires:7,
				path:"/"
			});
			window.location.href = "car.html";
		});
		//给+添加增加事件
		$(".add").on('click',function(){
			//console.log("增加");
			var id = $(this).parents(".cart").attr("data-good-id");
			var $cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var $cartObj = convertCartStrToObj($cartStr);
			$cartObj[id].num += 1;
			console.log($cartObj[id].num);
			//让输入框的数量再点击的时候加1；
			$(this).siblings("span").html("" + $cartObj[id].num);
			//让数量后面的钱数随着数量的增加也要增加；
			$(this).parents().siblings(".total").html("¥"+ $cartObj[id].num * $cartObj[id].price+"");
			//将增加的商品信息传入到cookie保存起来；
			$.cookie("cart",convertObjToCartStr($cartObj),{
				expires:7,
				path:"/"
			});
			balance();
		});
		//给-按钮增加事件
		$(".cut").on('click',function(){
			//console.log("这是减号");
			var id = $(this).parents(".cart").attr("data-good-id");
			var $cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var $cartObj = convertCartStrToObj($cartStr);
			//点击"-"的时候，要是商品的数量减一
			if($cartObj[id].num > 1){
				$cartObj[id].num -= 1;
				console.log($cartObj[id].num);
				//num上的数字减1
				$(this).siblings("span").html(""+$cartObj[id].num+"");
				//让num后面的钱数随着数量的减少而减少
				$(this).parent().siblings(".total").html("¥" + $cartObj[id].num * $cartObj[id].price + "");
				//将信息存入cookie中
				$.cookie("cart",convertObjToCartStr($cartObj),{
					expires:7,
					path:"/"
				});
			}
			balance();
			/*if($(".cars li input").attr("checked") != "checked"){
				var $count = $(".count").find("span").html();
				var $price = $count * goods_messages.price;
				$(".del span span").eq(0).find("b").html($count);
				$(".del span span").eq(1).find("b").html("¥" + $price);
				$(".go span span").eq(1).html("¥" + $price);
			}*/
		});
		//点击全选的时候，要让下面的选择框也打上对号，金额要自动结算
		$(".cart p .all").on("click",function(){
			var $count = $(".cars .count span").html();
			var $price = $count * goods_messages.price;
			//当选中全选按钮的时候，商品的数量及总钱数要改变；
			if($(this).attr("checked") == null){
				$(this).attr("checked","checked");
				$(this).parent().siblings(".title li").find("input").attr("checked","checked");
				/*$(".del span span").eq(0).find("b").html($count);
				$(".del span span").eq(1).find("b").html("¥" + $price+ "");
				$(".go span span").eq(1).html("" + $price);*/
				balance();
			}else{//当没有选中全选按钮的时候，商品的总数及总计要进行一个清空；
				$(this).removeAttr("checked");
				$(this).parent().siblings(".title li").find("input").removeAttr("checked");
				$(".del span span").eq(0).find("b").html("0");
				$(".del span span").eq(1).find("b").html("0");
				$(".go span span").eq(1).html("0");
			}
			if($(this).attr("checked") == "checked"){
				$(".cart ul li input").each(function(i,n){
					$(n).prop("checked","checked");
				})
			}else{
				$(".cart ul li input").each(function(i,n){
					$(n).removeAttr("checked");
				})
			}
		});
		//点击商品上的选择框的时候，只结算此个商品的价钱；
		//console.log($(".cars input").parent().parent().html());
		$(".cars input").on("click",function(){
			//console.log("我是商品信息单选的按钮");
			var $count = $("cars .count span").html();
			var $price = goods_messages.price * $count;
			if($(".cars li input").attr("checked") != "checked"){
				//console.log("点击结算");
				/*$(".del span span").eq(0).find("b").html($count);
				$(".del span span").eq(1).find("b").html("¥" + $price + "");
				$(".go span span").eq(1).html("¥" + $price + "");*/
				balance();
				$(".cars li input").attr("checked","checked");
			}else{
				$(".del span span").eq(0).find("b").html("0");
				$(".del span span").eq(1).find("b").html("0");
				$(".go span span").eq(1).html("0");
				$(".cars li input").removeAttr("checked");
			}
			//console.log($count+":"+$price);
		});
		balance();
		function balance(){
			var $count = $(".cars .count span").html();
			var $price = goods_messages.price * $count;
			if($(".cars li input").attr("checked") != "checked"){
				$(".del span span").eq(0).find("b").html($count);
				$(".del span span").eq(1).find("b").html("¥" + $price + "");
				$(".go span span").eq(1).html("¥" + $price + "");
			}
		}
		//点击结算的时候，弹出索要付款的金额，然后跳转回首页，清空购物车；
		//console.log($(".go span a").html());
		$(".go span a").on("click",function(){
			var $count = $(".cars .count span").html();
			var $price = goods_messages.price * $count;
			//console.log("这是结算的按钮");
			if($(".cart .all").attr("checked") != "checked"/* || $(".cart p .all").attr("checked") != "checked"*/){
				alert("您所选的商品为空，请选择商品之后再结算");
			}else{
				//console.log("开始结算");
				alert("您所商品的总金额为"+ $price +"元，点击确认后，将跳转会主页");
				window.location.href = "../index.html";
				var id = $(".oper a").parents(".cart").remove().attr("data-good-id");
				//console.log(id)
				var $cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				//console.log($.cookie('cart'))
				$.removeCookie('cart',{path:'/'})
				//var $cartObj = convertCartStrToObj($cartStr);
				//将删除的商品信息从cookie中删除；
				//delete $cartObj[id];
			}
		});
	}
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
});