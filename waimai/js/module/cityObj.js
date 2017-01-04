var cityObj = Object.create(addressObj);

cityObj = $.extend(cityObj,{
	name:'城市选择页',
	dom:$('#city')
});