$(function(){
	//console.log("我成功引入了");csww
	//鼠标移入输入框的时候，输入框的内容清空
	$('input').on('focus',function(){
		$(this).val("");
	});
	var name = "";
	var random = "";
	var tijiao = [0,0,0,0,0]
	//获取验证码的json文件
	$.getJSON('../json/register.json',function(resa){
		//console.log(res)csww;
		node();
		//验证码随机出现的函数
		function node(){
			random = Math.floor(Math.random() * 10);
			for(var i = 0 ; i < resa.length;i++){
				//创建一个img，来包裹验证码图片
				var $img = "<img name='"+resa[i].key+"' src='"+resa[i].src+"' />";
				//把图片插入到a标签的前面
				$('.tests a').before($img);
				//随机的一把钥匙
				name = resa[random].key;
			}
			//让随机的一张验证码图片显示，其余的隐藏
			$('.tests img').eq(random).css('display','block').siblings().not('input').not('a').css('display','none');
		}
		//点击看不清换一张的时候，图片随机改变
		$('.login div .tests a').on('click',function(){
			node();
		})
	});
	//当点击获取验证码的时候，装有验证码图片的盒子就出现了
	$('.reg_phone span').on('click',function(){
		$('.tests').css('display','block');
	});
	//手机号输入框的验证
	var $phone = $('.login div input').eq(0);
	//console.log($phone.val());
	$phone.blur(function(){
		fnPhone();
	});
	//图片验证码的输入框
	$('#register_body .tests input').blur(function(){
		//console.log("我移出了");
		verify();
	});
	//短信验证码的输入框
	$('.test input').blur(function(){
		//console.log('短信');
		fnNode();
	})
	//密码输入框的验证
	$('#register_body .reg_psd').blur(function(){
		fnPass();
	});
	//确认密码的输入框
	$('#register_body .reg_same').blur(function(){
		fnPassin();
	});
	//手机号输入框的函数
	function fnPhone(){
		var regph = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/g;
		if($phone.val() == ''){
			$('.login>div>.del').remove();
			$phone.after('<i class="del">请填写您的手机号</i>');
			tijiao[0]=0;
			return;
		}else{
			$('.del').remove();
			tijiao[0]=1;
		}
		if(!regph.test($phone.val())){
			$phone.after('<i class="del">请输入正确的手机号码</i>');
			tijiao=[0];
		}else{
			$('.del').remove();
			tijiao[0]=1;
		}
	}
	//验证码验证的函数
	function verify(){
		if($('.login .tests input').val() == ""){
			$(".note").remove();
			$(".tests a").after('<i class="note">请输入验证码</i>');
			tijiao[1]=0;
		}else if($(".login .tests input").val() != name){
			$(".note").remove();
			$(".tests a").after('<i class="note">请输入正确的验证码</i>');
			tijiao[1]=0;
		} else{
			$('.note').remove();
			tijiao[1]=1;
		}
	}
	//短信验证码的输入框
	function fnNode(){
		//console.log('短信');
		if($(".login .tests input").val() == name){
			//console.log('igo');csww
			var reNode = /^[0-9]{6}$/g;
			/*var $phone_node = $('.test input').val();*/
			if($('.test input').val() == ""){
				$(".tel_del").remove();
				$(".reg_phone").after('<i class="tel_del">请填写手机验证码</i>');
				tijiao[2]=0
				return;
			}
			if(!reNode.test($('.test input').val())){
				$('.tel_del').remove();
				$('.reg_phone').after('<i class="tel_del">请填写正确的验证码</i>');
				tijiao[2]=0
			}else{
				$('.tel_del').remove();
				tijiao[2]=1;
			}
		}
	}
	//短信验证的倒计时
	var timer;
	$('.test .reg_phone span').on('click',function(){
		$(this).parent().css('background','#ccc')
		$('.split').css('display','block');
		clearInterval(timer);
		var $seconds = 30;
		$(this).html("重新发送("+$seconds+")");
		function Settime(){
			if($seconds == 0){
				$('.test .reg_phone span').html("获取验证码").parent().css('background','#724a88');
				$('.split').css('display','none');
			}else{
				$seconds--;
				/*console.log($seconds);*/
				$('.test .reg_phone span').html("重新发送("+$seconds+")");
				//console.log($('.test .reg_phone span').html());
			}
		}
		timer = setInterval(function(){
			Settime(); 
		},1000);
	});
	//密码验证
	function fnPass(){
		//console.log('mima');
		var rePass = /^[0-9a-zA-Z-_]{6,12}$/g;
		$psd = $('.reg_psd').val();
		if($psd == ""){
			$('.psd_del').remove();
			$('.reg_psd').after('<i class="psd_del">密码不能为空</i>');
			tijiao[3]=0;
		}else if(!rePass.test($psd)){
			$('.psd_del').remove();
			$('.reg_psd').after('<i class="psd_del">请输入6-12位密码，数字、字母、符号两种以上组合</i>');
			tijiao[3]=0;
		}else if(rePass.test($psd)){
			$('.psd_del').remove();
			$('.reg_psd').after('<i class="psd_del"></i>');
			tijiao[3]=1;
		}else{
			$('.psd_del').remove();
			tijiao[3]=1;
		}
	}
	//确认密码
	function fnPassin(){
		//console.log('确认')
		$same = $('.reg_same').val();
		if($same != $psd && $same != ""){
			$('.same_del').remove();
			$('.reg_same').after('<i class="same_del">两次密码输入不一致，请重新输入</i>');
			tijiao[4]=0;
		}else if($same == ""){
			$('.same_del').remove();
			$('.reg_same').after('<i class="same_del">密码不能为空</i>')
		}else{
			$('.same_del').remove();
			tijiao[4]=1;
		}
	}
	//注册的点击事件
	$('.register').on('click',function(){
		for(var i = 0 ; i < tijiao.length;i++){
			if(tijiao[i] == 0){
				alert("请将注册信息填写完整");
				return false;
			}
		}
		var $phone = $('.login div input').eq(0).val();
		var $psd = $('.reg_psd').val();
		$.ajax({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			data:{
				status:'register',
				userID:$phone,
				password:$psd
			},
			type:'POST',
			success:function(res){
				console.log(res);
				switch(res){
					case '0':$('.login div input').eq(0).after('<i class="del">您与其他用户重名了</i>');
					break;
					case '1':console.log('注册成功');
					window.location.href = "login.html";
					break;
					case '2':alert('不好意思、程序出错了、请稍候...');
					break;
					default:
					console.log('执行了');
					break;
				}
			}
		});
	});
});