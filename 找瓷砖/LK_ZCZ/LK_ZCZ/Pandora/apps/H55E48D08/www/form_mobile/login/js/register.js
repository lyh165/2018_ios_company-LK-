function register() {
	var display = $("#picture_2").css("display");
	var user_phone = $("#user_phone").val();
	var registerCode = $("#code").val();
	var user_paw = $("#user_paw").val();
	if(isUndefinedAndEmpty(user_phone)) {
		mui.toast('请输入手机号!');
		return;
	} else if(!validateElement('mobile', user_phone)) {
		mui.toast('请输入有效的手机号码！');
		return;
	} else if(isUndefinedAndEmpty(user_paw)) {
		mui.toast('请输入密码!');
		return;
	} else if(isUndefinedAndEmpty(registerCode) || !validateElement("number", registerCode)) {
		mui.toast('请输入验证码！');
		return;
	} else if(display == 'none') {
		mui.toast('请阅读并同意注册协议！');
		return;
	}
	var json = {
		"user_phone": user_phone,
		"registerCode": registerCode,
		"user_paw": user_paw,
	};
	var jsonAjax = {
		"url": "app_updateUserData.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "register_back",
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}

function register_back(jsonObj) {
	mui.toast('注册成功！');
    $("#user_phone").val("");
	$("#code").val("");
	$("#user_paw").val("");
	$('#picture_2').css('display','none');
	$('#picture_1').css('display','');
	mui.openWindow({
		url: "login_land.html",
		id:"login_land",
	});
}
/**
 * 发送短信验证
 */
function registerCode() {
	var user_phone = $('#user_phone').val();
	if(isUndefinedAndEmpty(user_phone)) {
		mui.toast('请输入手机号码！');
		return;
	}
	if(!validateElement('mobile', user_phone)) {
		mui.toast('请输入正确的手机号码！');
		return;
	}
	var jsonObj = {
		"user_phone": user_phone,
		"type": "4"
	}
	var jsonAjax = {
		"url": "sendMegCode.do",
		"jsonData": jsonObj,
		"methodName": "registerCode_back",
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}

function registerCode_back(jsonObj) {
	runCodeTime(0);
}
function openAgreement(){
	mui.openWindow({
		url: "../mine/shezhi/yonghuxieyi.html",
		id:"yonghuxieyi",
	});
}
