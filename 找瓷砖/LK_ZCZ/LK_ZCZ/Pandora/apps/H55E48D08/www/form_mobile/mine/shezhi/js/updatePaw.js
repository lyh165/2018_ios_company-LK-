

function changeUpdate(){
	var oldPaw = $("#oldPaw").val();
	if(isUndefinedAndEmpty(oldPaw)){
		mui.toast("请输入旧密码！");
		return;
	}
	var newPaw = $("#newPaw").val();
	if(isUndefinedAndEmpty(newPaw)){
		mui.toast("请输入新密码！");
		return;
	}
	var newPaw2 = $("#newPaw2").val();
	if(isUndefinedAndEmpty(newPaw2)){
		mui.toast("请再次输入新密码！");
		return;
	}
	if(oldPaw==newPaw||oldPaw==newPaw2){
		mui.toast("新旧密码一样，请重新输入！");
		return;
	}
	if(newPaw==newPaw2){
		var json = {
			"old_paw": oldPaw,
			"new_paw":newPaw,
			"user_id":getUserLocalData().user_id,
		};
		var jsonAjax = {
			"url": "app_updatePawByUserId.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "changeUpdate_back",
		};
		getAjaxData(jsonAjax);
	}else{
		mui.toast("两次输入的密码不符，请重新输入！");
		return;
	}
}
function changeUpdate_back(jsonObj){
	$("#oldPaw").val("");
	$("#newPaw").val("");
	$("#newPaw2").val("");
	$("#update_paw_successful").css("display","block");
}
function update_paw_successful_sure(){
	$("#update_paw_successful").css("display","none");
	mui.openWindow({
		url: '../mine.html',
		id: 'mine',
	});
}

