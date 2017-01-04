//血一个hash值与模块之间的映射关系表

var hashMap = {
	'address':addressObj,
	'city':cityObj,
	'rlist':rlistObj,
	'detail':detailObj
};

var firstmodule = null;
var nowmodule = null;

function change(hash){
	var module = hashMap[hash] || hashMap['address'];
	firstmodule = nowmodule;
	nowmodule = module;
	if(firstmodule){
		firstmodule.leave();
	}
	nowmodule.enter();
}

if(location.hash){
	var hash = location.hash.slice(1);
	change(hash);
}else{
	change('address');
}

window.onhashchange = function(){
	var hash = location.hash.slice(1);
	change(hash);
}