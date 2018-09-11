/**
 * 微信支付
 */
function getWXPay(url) {
	var params = {
		"url": url
	};
	plus.HGDQPlugin.openWXPay(params, function(data) {}, function(data) {});
}
/**
 * 安卓分享
 * sharehrefDes  内容
 * sharehrefTitle  标题
 * shareHref  链接
 * shareImg  图片
 * index  0：朋友圈；1：微信好友；2：QQ；3：新浪微博
 */
function androidShare(params){
	plus.HGDQPlugin.androidShareNative(params, function(data) {}, function(data) {});
}

/**
 * 登录
 * @param {Object} params
 */
function loginIM(id,token) {
	var params={
		"user_id":id,
		"user_token":token,
	}
	plus.HGDQPlugin.loginChatNative(params, function(data) {}, function(data) {});
}
/**
 * 打开原生对话
 * @param {Object} params
 */
function gotoIm(params) {
	plus.HGDQPlugin.toLiveRoomChatNative(params, function(data) {}, function(data) {});
}
/**
 * 退出
 * @param {Object} params
 */
function goToScanIDCardByIdPusherByExit(id,token) {
	var params={
		"user_id":id,
		"user_token":token,
	}
	plus.HGDQPlugin.exitChatNative(params, function(data) {}, function(data) {});
}

/**
 * 打开原生列表
 * @param {Object} params
 */
function goToScanIDCardByIdPusherByList(id,token) {
	var params={
		"user_id":id,
		"user_token":token,
	}
	plus.HGDQPlugin.listChatNative(params, function(data) {}, function(data) {});
}
/**
 * 安卓分享返回
 */
function returnAndroidShare(data){
	
}

/**
 * 原生微信支付回调
 */
function returnWXPay(data) {
	if(data.resultStatus == '9000') {
		iosReturnALiYunPay();
	} else {
		mui.alert("支付失败！");
	}
}

/**
 * 原生列表返回
 */
function returnIMList(data){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/iPhone/i) == "iphone") {
		data = JSON.stringify(data);
	}
	if("0" == data.length) {
		content = '<div class="shopping_cart"><img src="../../util/img/xiaoxi.png" style="width: 3.5rem;"/></div>';
		content += '<div class="text4"><span class="text_4">暂无消息哦</span></div>';
		$("#notice2").html(content);
		return;
	} else {
		var json = {
			"data": data,
		}
		var jsonAjax = {
			"url": "app_findUserDataByIm.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "showChatList_back",
		}
		getAjaxData(jsonAjax);
	}
}
document.addEventListener("plusready", function() {
	var _BARCODE = 'HGDQPlugin',
		B = window.plus.bridge;
	var HGDQPlugin = {
		//im
		loginChatNative: function(params, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			//通知执行异步方法
			return B.exec(_BARCODE, "loginChatNative", [callbackID, params]);
		},
		exitChatNative: function(params, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			//通知执行异步方法
			return B.exec(_BARCODE, "exitChatNative", [callbackID, params]);
		},
		toLiveRoomChatNative: function(params, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			//通知执行异步方法
			return B.exec(_BARCODE, "toLiveRoomChatNative", [callbackID, params]);
		},
		listChatNative: function(params, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			//通知执行异步方法
			return B.exec(_BARCODE, "listChatNative", [callbackID, params]);
		},
		androidShareNative: function(params, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			//通知执行异步方法
			return B.exec(_BARCODE, "androidShareNative", [callbackID, params]);
		},
		openWXPay: function(params, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			//通知执行异步方法
			return B.exec(_BARCODE, "openWXPay", [callbackID, params]);
		}
	};
	window.plus.HGDQPlugin = HGDQPlugin;
}, true);