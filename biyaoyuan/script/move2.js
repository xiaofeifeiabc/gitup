function getStyle(dom,attr){
		if(dom.currentStyle){
			return dom.currentStyle[attr]
		}else{
			return getComputedStyle(dom,false)[attr]
		}
}
//多属性的运动框架;
function move(dom,json,fn){
	clearInterval(dom.timer);
	dom.timer = setInterval(function(){
		var bStop = true;//是否完成动画
		//在定时器之中遍历 josn;
		for(var attr in json){
			//width
			//速度;
			if(attr == 'opacity'){
				var cur = Math.round(parseFloat(getStyle(dom,'opacity'))*100);
			}else{
				var cur = parseInt(getStyle(dom,attr));
			}
			//速度不同 >>>  获取 有所不同
			var speed = (json[attr] - cur) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//终止条件;
				//运动不同
			if(attr == 'opacity'){
				dom.style[attr] = (cur + speed) / 100;
				dom.style.filter = 'alpha(opacity:'+(cur + speed)+')'
			}else{
				dom.style[attr] = cur + speed + 'px';
			}
			if(json[attr] != cur){
				bStop = false;
			}
		}
		if(bStop){
			clearInterval(dom.timer);
			if(fn){
				fn()
			}
		}
	}, 30);
}
