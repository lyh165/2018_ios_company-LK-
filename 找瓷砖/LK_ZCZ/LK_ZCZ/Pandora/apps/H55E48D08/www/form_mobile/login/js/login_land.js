mui.init();
$(function() {
	$('#user_phone').val(localStorage.getItem("user_phone"));
	$('#user_paw').val(localStorage.getItem("user_paw"));
})
mui.plusReady(function() {
	plus.geolocation.getCurrentPosition( geoInf, function ( e ) {
	},{geocode:true});
})
$("#login").click(function() {
	var user_phone = $("#user_phone").val();
	var user_paw = $("#user_paw").val();
	if(isUndefinedAndEmpty(user_phone) || isUndefinedAndEmpty(user_paw)) {
		mui.toast('手机号或密码不能为空');
		return;
	}
	if(!validateElement('mobile', user_phone)) {
		mui.toast('请输入正确的手机号！');
		return;
	}
	var json = {
		"user_phone": user_phone,
		"user_paw": user_paw,
	};
	var jsonAjax = {
		"url": "app_login.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "loginIndex_back",
		"set_user_phone": user_phone,
		"set_user_paw": user_paw,
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
});

function loginIndex_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	mui.toast('登录成功');
	setUserLocalData(jsonInfo.data);
	loginIM(getUserLocalData().user_id,getUserLocalData().im_token);
	localStorage.setItem("user_phone", jsonObj.set_user_phone);
	localStorage.setItem("user_paw", jsonObj.set_user_paw);
	if(isUndefinedAndEmpty(getUserLocalData().position_name)){
		mui.openWindow({
			url: "now_occupation.html",
			id: "now_occupation"
		});
		return;
	}
	if(isUndefinedAndEmpty(getUserLocalData().position_future)){
		mui.openWindow({
			url: "future_occupation.html",
			id: "future_occupation"
		});
		return;
	}
	mui.openWindow({
		url: "../index/index.html",
		id: "index"
	});
	setTimeout(function() {
		plus.webview.hide('login');
		plus.nativeUI.closeWaiting();
	}, 2000);
}
$("#registra").click(function(){
	mui.openWindow({
		url: "register.html",
		id: "register"
	});
})
$("#forget").click(function(){
	mui.openWindow({
		url: "forget.html",
		id: "forget"
	});
})

/**
 * 检查网络状态
 */
function wainshow(){
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE){
		 mui.toast("当前网络不佳，请检查网络！");
	}
}
function getditu(){
//	plus.geolocation.getCurrentPosition(geoInf, function(e) {
//
//	}, {
//		geocode: true,
//		enableHighAccuracy: true,
//		provider: 'baidu' //provider: (String 类型 )优先使用的定位模块。可取以下供应者： "system"：表示系统定位模块，支持wgs84坐标系； "baidu"：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系； "amap"：表示高德定位模板，支持gcj02坐标系。 默认值按以下优先顺序获取（amap>baidu>system），若指定的provider不存在或无效则返回错误回调。 注意：百度/高德定位模块需要配置百度/高德地图相关参数才能正常使用
//	});
}
function geoInf(position) {
	var str = "";
	var str = position.address.district;//获取地址信息
	var codns = position.coords;//获取地理坐标信息；
	var lat = codns.latitude;//获取到当前位置的纬度；
	var longt = codns.longitude;//获取到当前位置的经度
	localStorage.setItem("lng_val",longt);
	localStorage.setItem("lat_val",lat);
	localStorage.setItem("city_name",str);
//	var codns = position.coords; //获取地理坐标信息；
//	var lng_val = codns.longitude; //获取到当前位置的经度
//	var lat_val = codns.latitude; //获取到当前位置的纬度；

//	alert(lat_val)
//	//提醒：position.address 获取的是地址集合包括省市县街道等.如果获取不到就返回undefined
//	//country国家，province省，city城市，district区（县）名称，street街道和门牌信息
//	//poiNamePOI信息。如“电子//城．国际电子总部”
//	var Position_user = position.address.district;
//	localStorage.setItem("city_name",Position_user);
}