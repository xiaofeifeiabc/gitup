var addressObj = {
	name:'地址搜索页',
	dom:$('#address'),
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		console.log("事件绑定成功");
	},
	enter:function(){
		this.dom.show();
	},
	leave:function(){
		this.dom.hide();
	}
};