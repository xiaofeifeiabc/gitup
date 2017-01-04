$(function(){
//glasses(眼镜)
	$.getJSON('json/index/glasses.json',function(data){
		//console.log(data[0].src);
		json = data;
		init('glasses');
	});
//man(男装)
	$.getJSON('json/index/man.json',function(data){
		json = data;
		init('man');
	});
//lady(女装)
	$.getJSON('json/index/lady.json',function(data){
		json = data;
		init('lady');
	});
//underwear(内衣、袜子)
	$.getJSON('json/index/underwear.json',function(data){
		json = data;
		init('underwear');
	});
//child(母婴儿童)
	$.getJSON('json/index/child.json',function(data){
		json = data;
		init('child');
	});
//shose(男鞋、女鞋)
	$.getJSON('json/index/shose.json',function(data){
		json = data;
		init('shose');
	});
//sport(户外运动)
	$.getJSON('json/index/sport.json',function(data){
		json = data;
		init('sport');
	});
//leather(真皮皮具)
	$.getJSON('json/index/leather.json',function(data){
		json = data;
		init('leather');
	});
//travel(出行必备)
	$.getJSON('json/index/travel.json',function(data){
		json = data;
		init('travel');
	});
//ornament(创搭配饰)
	$.getJSON('json/index/ornament.json',function(data){
		json = data;
		init('ornament');
	});
//cosmetics(美妆洗护)
	$.getJSON('json/index/cosmetics.json',function(data){
		json = data;
		init('cosmetics');
	});
//nurse(个人护理)
	$.getJSON('json/index/nurse.json',function(data){
		json = data;
		init('nurse');
	});
//house(家居生活)
	$.getJSON('json/index/house.json',function(data){
		json = data;
		init('house');
	});
//kitchen(厨具水具)
	$.getJSON('json/index/kitchen.json',function(data){
		json = data;
		init('kitchen');
	});
//furniture(家居建材)
	$.getJSON('json/index/furniture.json',function(data){
		json = data;
		init('furniture');
	});
//加载方法
	function init(category){
		var img = '';
		var imgName = '';
		var imgMoney = '';
		var dl = '';
		for(var i = 0;i < json.length;i ++){
			dl = '<dl></dl>';
			$(".category-" + category + " .goods").append(dl);
			img = '<a href="' + json[i].href + '"><img src="' + json[i].src + '"width="285px" /><img class="line" src="img/jing.png"></a>';
			imgName = '<dt>' + json[i].name + '</dt>';
			imgMoney = '<dd>' + json[i].money + '</dd>';
			$(".category-" + category + " dl").eq(i).append(img);
			$(".category-" + category + " dl").eq(i).append(imgName);
			$(".category-" + category + " dl").eq(i).append(imgMoney);
			//console.log(img);
		}
		$("dl img").on('mouseenter',function(){
			$(this).stop().animate({"width":"310px","left":"-5px"},300);
			$(this).parent().css({"box-shadow":" 0 0 8px #ccc"});
		});
		$("dl img").on('mouseleave',function(){
			$(this).stop().animate({"width":"300px","left":"0"},300);
			$(this).parent().css({"box-shadow":" 0 0 0px white"});
		});
		//console.log($("dl img"))
	}
	//楼梯
	var oleftSus = document.getElementById('left-suspend');
	var oSusUl = oleftSus.children[0];
	var aSusLi = oSusUl.children;
	var leftSusTop;
	for(var i = 0;i < aSusLi.length-1;i++){
		aSusLi[i].index = i;
		aSusLi[i].onclick = function(){
			for(var j = 0;j < aSusLi.length-1;j++){
				aSusLi[j].children[0].className = '';
			}
			aSusLi[this.index].children[0].className = 'lou';
			susBack(this.index*850+1600);//每层楼高850px;头到一楼的高度为1600px
			//console.log("我是最后一个li");
		}
	}
	$(window).scroll(function(){
		var $scrolltop = $(document).scrollTop();
		//console.log($scrolltop);
		if($scrolltop >= 600){
			$('#left-suspend').css("display","block");
		}else{
			$('#left-suspend').css("display","none")
		}
		var $scrollIndex = Math.ceil(($('body').scrollTop()-1600)/850);
		if($scrollIndex >=0){
			//console.log($scrollIndex);
			$('#left-suspend ul li').animate({
				'width':'90px'
			},2000).css('background','');
			$('#left-suspend ul li').eq($scrollIndex).animate({
				'width':'90px'
			},2000).css('background','#f99');
		}
	})
	var timerSus;
	function susBack(target){//楼梯定位
		var oleftSus = document.getElementById('left-suspend');
		//楼梯定时器
		clearInterval(timerSus);
		timerSus = setInterval(function(){
			var speed = ((target - document.body.scrollTop)/6);
			console.log(speed)
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			console.log(speed)
			if((document.documentElement.scrollTop || document.body.scrollTop) == target){
				console.log('target:'+target)
				clearInterval(timerSus);
			}else{
				document.documentElement.scrollTop = document.documentElement.scrollTop + speed;
				document.body.scrollTop = document.body.scrollTop + speed;			
			}
		},30);
	}
});