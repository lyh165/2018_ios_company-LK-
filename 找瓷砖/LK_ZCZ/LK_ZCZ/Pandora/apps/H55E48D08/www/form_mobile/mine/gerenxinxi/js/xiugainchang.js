mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var user_name = self.user_name;
	$("#userName").val(user_name);
});

function submit_name() {
	var user_name = $("#userName").val();
	if(isUndefinedAndEmpty(user_name)) {
		mui.toast("请输入昵称");
		return;
	}
	var nameLenght=0;
	var names = new Array();
	names = user_name.split('');
	for(var x in names) {
		if(validateElement('chinese',names[x])){
			nameLenght+=2;
		}else{
			nameLenght+=1;
		}
	}
	if(nameLenght < 6||nameLenght>18) {
		mui.toast("昵称不符合要求，请重新输入");
		return;
	}
	var json = {
		"user_name": user_name,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserInfoByNameData.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "submit_name_back",
	};
	getAjaxData(jsonAjax);
}

function submit_name_back(jsonObj) {
	var page = plus.webview.getWebviewById("bianjiziliao");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "bianjiziliao.html",
		id: "bianjiziliao"
	});
}

function sure() {
	$("#update_name_successful").hidden();
	
}
/*返回键的设置*/
mui.init({
	keyEventBind: {
		backbutton: true //打开back按键监听
	}
});

/*返回键调用的函数*/
mui.back = function() {
	var page = plus.webview.getWebviewById("bianjiziliao");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "bianjiziliao.html",
		id: "bianjiziliao"
	});
}