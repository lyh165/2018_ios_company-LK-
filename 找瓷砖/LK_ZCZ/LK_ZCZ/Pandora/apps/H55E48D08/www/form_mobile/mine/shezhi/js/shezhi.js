function openXiugaidenglumima() {
	mui.openWindow({
		url: 'xiugaidenglumima.html',
		id: 'xiugaidenglumima',
	});
}

function openTousujiangyi() {
	mui.openWindow({
		url: 'tousujianyi.html',
		id: 'tousujianyi',
	});
}

function openGuanyuwomen() {
	mui.openWindow({
		url: 'guanyuwomen.html',
		id: 'guanyuwomen',
	});
}

function openYonghuxieyi() {
	mui.openWindow({
		url: 'yonghuxieyi.html',
		id: 'yonghuxieyi',
	});
}
//清除缓存
function changeClear() {
	$("#clean").css("display", "block");
}

function clean_sure() {
	$("#clean").css("display", "none")
}
//退出登录
function outLongin() {
	$("#out_login").css("display", "block");
}

function outLogin_cancel() {
	$("#out_login").css("display", "none");
}

function outLogin_sure() {
	goToScanIDCardByIdPusherByExit(getUserLocalData().user_id,getUserLocalData().im_token);
	localStorage.setItem("userJson", '');
	var set = plus.webview.currentWebview();
	var url = set.getURL();
	var ws = plus.webview.all();
	for(var i = 0; i < ws.length; i++) {
		if(ws[i].getURL() != url) {
			claerPage(ws[i]);
		}
	}
	plus.webview.open('../../login/login_land.html');
	set.close();
}
function addOpinion() {
	var opinion_content = $("#opinionText").val();
	if(isUndefinedAndEmpty(opinion_content)) {
		mui.toast('请填写内容！');
		return;
	}
	var json = {
		"opinion_content": opinion_content,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_addOpinion.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "addOpinion_back",
	};
	getAjaxData(jsonAjax);
}

function addOpinion_back(jsonObj) {
	$("#add_opinion_successful").css("display", "block");
}

function add_opinion_successful_sure() {
	mui.toast('提交成功！');
	$("#add_opinion_successful").css("display", "none");
	$("#opinionText").val('');
	mui.openWindow({
		url: '../mine.html',
		id: 'mine',
		extras: { //这是要传的数据
		},
	});
}

