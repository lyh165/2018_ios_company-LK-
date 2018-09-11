/**
 * 发送短信验证
 */
function frogetCode(){
	var user_phone = $('#user_phone').val();
	if(isUndefinedAndEmpty(user_phone)||!validateElement("mobile", user_phone)){
		mui.toast("请输入正确的手机号码！")
		return;
	}
	var jsonObj = {
		"user_phone": user_phone,
		"type":'4',
	}
	var jsonAjax = {
		"url": "sendMegCode.do",
		"jsonData": jsonObj,
		"methodName": "frogetCode_back",
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}
function frogetCode_back(jsonObj) {
	runCodeTime(0);
}
/**
 * 确认提交
 */
function forgetPaw(){
	var user_phone = $("#user_phone").val();
	if(isUndefinedAndEmpty(user_phone)) {
		mui.toast('请输入手机号!');
		return;
	}
	if(!validateElement("mobile", user_phone)) {
		mui.toast('请输入有效的手机号码！');
		return;
	}
	var forgetCode = $("#forgetCode").val();
	if(isUndefinedAndEmpty(forgetCode) || !validateElement("number", forgetCode)) {
		mui.toast('请输入验证码！');
		return;
	}
	var user_paw = $("#user_paw").val();
	if(isUndefinedAndEmpty(user_paw)) {
		mui.toast('请输入密码!');
		return;
	}
	var json = {
		"user_phone":user_phone,
		"forgetCode":forgetCode,
		"user_paw":user_paw,
	};
	var jsonAjax = {
		"url": "app_updatePaw.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "forgetPaw_back",
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}
function forgetPaw_back(jsonObj){
	mui.toast("修改成功！")
	$("#user_phone").val("");
	$("#forgetCode").val("");
	$("#user_paw").val("");
		mui.openWindow({
		url: "login_land.html"
	});
	
}
