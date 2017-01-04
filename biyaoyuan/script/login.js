$(function(){
	//登录
	//当鼠标移入输入框内的时候，让输入框的内容为空 >>> 清空输入框
	var tijiao = [0,0];
	$('input').on('focus',function(){
		$(this).val("");
	});
	//当手机号的输入框失焦的时候
	$('.login_txtphone').on('blur',function(){
		logText();
	})
	//当密码的输入框失焦的时候
	$('.login_txtpass').on('blur',function(){
		
		//console.log($log_pass);
		logPass();
	})
	//当手机号输入框失焦时候使用的函数
	function logText(){
		var regph = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/g;

		var $log_txt = $('.login_txtphone').val();
		//console.log($log_txt);
		if($('.login_txtphone').val() == ''){
			//console.log("内容为空");
			$('.log_del').remove();
			$('.login_txtphone').after('<i class="log_del">请输入正确的登录名</i>');
			tijiao[0] = 0;
		}else if(!regph.test($log_txt)){
			$('.log_del').remove();
			$('.login_txtphone').after('<i class="log_del">您输入的用户名格式不正确</i>');
			tijiao[0] = 0;
		}else{
			$('.log_del').remove();
			tijiao[0] = 1;
		}
	}
	//当密码的输入框失焦的时候使用的函数
	function logPass(){
		//console.log('mima');
		var rePass = /^[0-9a-zA-Z-_]{6,12}$/g;
		var $log_pass = $('.login_txtpass').val();
		if($('.login_txtpass').val() == ''){
			//console.log("内容为空");
			$('.psd_del').remove();
			$('.login_txtpass').after('<i class="psd_del">请输入密码且不能包含空格</i>')
			tijiao[1] = 0;
		}else if(!rePass.test($log_pass)){
			$('.psd_del').remove();
			$('.login_txtpass').after('<i class="psd_del">您的密码格式输入有误</i>');
			tijiao[1] = 0;
		}else{
			$('.psd_del').remove();
			tijiao[1] =1;
		}
	}
	//当点击登录的时候，向服务器传送内容(Ajax)；
	$('.login_log').on('click',function(){
		for(var i = 0 ; i < tijiao.length;i++){
			if(tijiao[i] == 0){
				alert("请填写你的用户名及密码");
				return false;
			}
		}
		var $log_txt = $('.login_txtphone').val();
		var $log_pass = $('.login_txtpass').val();
		$.ajax({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			data:{
				status:'login',
				userID:$log_txt,
				password:$log_pass
			},
			type:'POST',
			success:function(res){
				//console.log(res);
				switch(res){
					case '0':
						$('.log_del').remove();
						$('.login_txtphone').after('<i class="log_del">您所输入的姓名不存在</i>');
						break;
					case '2':
						$('.psd_del').remove();
						$('.login_txtpass').after('<i class="psd_del">您的密码输入错误</i>');
						break;
					default:
						//console.log("登陆成功、请稍等片刻！");
						/*$('.log_psuccess').remove();
						$('.login_log').after('<p class="log_psuccess">登录成功、请稍等片刻!</p>');*/
						$.cookie('id',$log_txt,{'expires':15,'path':'/'});
						console.log("跳转过来了");
						window.location.href = "../index.html";
						break;
				}
			}
		});
	});
	/*$('.zhuxiao').parent().css('display','none');*/
	
	/*welcome();*/
});