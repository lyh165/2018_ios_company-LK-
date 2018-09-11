$(function() {
	getUserData();
});

function initData() {
	getUserData();
}

function getUserData() {
	var json = {
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_findByIdByUserId.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getUserData_back",
	};
	getAjaxData(jsonAjax);
}

function getUserData_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	if(!isUndefinedAndEmpty(data.user_img)) {
		$("#userImg").attr("src", path_url_img + data.user_img);
	}
	$("#userName").html(data.user_name);
	if(data.user_sex == '1') {
		$("#userSex").html('男');
	} else {
		$("#userSex").html('女');
	}
	if(!isUndefinedAndEmpty(data.user_company)){
		var user_companys='';
		var str=data.user_company.split(',');
		for (var i=0;i<str.length;i++) {
			user_companys+='<span class="xinxi" >'+ str[i]+'</span>';
		}
			$("#userComp").html(user_companys);
	}
	
	if(!isUndefinedAndEmpty(data.user_compary_past)){
		var user_compary_pasts='';
		var str=data.user_compary_past.split(',');
		for (var i=0;i<str.length;i++) {
			user_compary_pasts+='<span class="xinxi" >'+ str[i]+'</span>';
		}
			$("#pastComp").html(user_compary_pasts);
	}
	
	if(!isUndefinedAndEmpty(data.position_name)){
		var position_names='';
		var str=data.position_name.split(',');
		for (var i=0;i<str.length;i++) {
			position_names+='<span class="xinxi xinxi1" >'+ str[i]+'</span>';
		}
			$("#userPosition").html(position_names);
	}
	if(!isUndefinedAndEmpty(data.position_future)){
		var position_futures='';
		var str=data.position_future.split(',');
		for (var i=0;i<str.length;i++) {
			position_futures+='<span class="xinxi xinxi2" >'+ str[i]+'</span>';
		}
			$("#future").html(position_futures);
	}
}

/*上传图片的回调*/
function setUserImg(jsonObj) {
	var userImg = jsonObj.data;
	//修改头像
	var json = {
		"user_img": userImg,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserInfoImgData.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "setUserImg_back",
		"user_img": userImg,
	};
	getAjaxData(jsonAjax);
}

function setUserImg_back(jsonObj) {
	$("#userImg").attr("src", path_url_img + jsonObj.user_img);
}
//修改性别
document.getElementById('changWomen').addEventListener('tap', function() {
	var json = {
		"user_sex": 2,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserSexData.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "changWomen_back",
	};
	getAjaxData(jsonAjax);
})
function changWomen_back(jsonObj) {
	$("#userSex").html('女');
}
document.getElementById('changMen').addEventListener('tap', function() {
	var json = {
		"user_sex": 1,
		"user_id": getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_updateUserSexData.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "changMen_back",
	};
	getAjaxData(jsonAjax);
})
function changMen_back(jsonObj) {
	$("#userSex").html('男');
}
//编辑昵称
function openName() {
	var user_name = $("#userName").html();
	mui.openWindow({
		url: 'xiugaincheng.html',
		id: 'xiugaincheng',
		extras: { //这是要传的数据
			"user_name": user_name,
		},
	});
}
//编辑工作企业
function openComp() {
	var user_company = null;
	$("#userComp").find(".xinxi").each(function(){
		if(null==user_company){
			user_company=$(this).text();
		}else{
			user_company+=","+$(this).text();
		}
	});
	mui.openWindow({
		url: 'gongzuoqiye.html',
		id: 'gongzuoqiye',
		extras: { //这是要传的数据
			"user_company": user_company,
		},
	});
}
//编辑过往工作企业
function openPastComp() {
	var user_compary_past = null;
	$("#pastComp").find(".xinxi").each(function(){
		if(null==user_compary_past){
			user_compary_past=$(this).text();
		}else{
			user_compary_past+=","+$(this).text();
		}
	});
	mui.openWindow({
		url: 'past_gongzuoqiye.html',
		id: 'past_gongzuoqiye',
		extras: { //这是要传的数据
			"user_compary_past": user_compary_past,
		},
	});
}
//编辑目前职业
function openPosition() {
	var position_name = null;
	$("#userPosition").find(".xinxi").each(function(){
		if(null==position_name){
			position_name=$(this).text();
		}else{
			position_name+=","+$(this).text();
		}
	});
	mui.openWindow({
		url: 'muqianzhiye.html',
		id: 'muqianzhiye',
		extras: { //这是要传的数据
			"position_name": position_name,
		},
	});
}
//编辑企业愿景
function openFuturePosition() {
	var position_future = null;
	$("#future").find(".xinxi").each(function(){
		if(null==position_future){
			position_future=$(this).text();
		}else{
			position_future+=","+$(this).text();
		}
	});
	mui.openWindow({
		url: 'zhiyeyuanjing.html',
		id: 'zhiyeyuanjing',
		extras: { //这是要传的数据
			"position_future": position_future,
		},
	});
}