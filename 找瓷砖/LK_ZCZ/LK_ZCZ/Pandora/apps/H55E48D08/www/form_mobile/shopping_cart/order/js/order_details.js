mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	order_id=self.orderId;
	getNoPayOrderDetail(order_id);
});
var order_id='';
var money='';
function getNoPayOrderDetail(orderId) {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id,
		"order_id": orderId
	};
	var jsonAjax = {
		"url": "app_getOrderDetailByOrderId.do",
		"jsonData": json,
		"methodName": "getNoPayOrderDetail_back",
	};
	getAjaxData(jsonAjax);
}

function getNoPayOrderDetail_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var all = strToJson(jsonInfo.data);
	var order = all.order;
	var content = "";
	var proList = strToJson(order.proList);
	money=order.order_cost;
	$("#getOrderId").val(order.order_id);
	$("#orderCost").html('需付款:￥' + money);
	$("#addressPerson").html(order.address_person);
	$("#addressPhone").html(order.address_phone);
	$("#addressDetail").html(order.address_detail);
	$("#orderId").html('下单编号：' + order.order_id);
	$("#lrsj").html('下单时间：' + order.lrsj);
	$("#shouldPay").html('￥' + money);
	$("#shouldPay2").html('需付款:￥' + money);
	$("#shopName").html(order.shop_name);
	$.each(proList, function(e, obj) {
		content += '<div class="content_product">';
		content += '<span class="product"><img src="' + path_url_img + obj.product_logo + '" style="width: 3.75rem;"/></span>';
		content += '<div class="content1-text">';
		content += '<span class="content-text1">' + obj.product_name + '</span>';
		content += '<span class="content-text2">' + obj.orderdetail_val + '</span>';
		content += '<span class="number1">x' + obj.product_num + '</span></div></div>';
	});
	$("#proList").html(content);
}

/**
 * 取消订单
 */
function cancelOrder() {
	document.getElementById("bg1").style.display = "";
}

function cancelOrder_cancel() {
	document.getElementById("bg1").style.display = "none";
}

function cancelOrder_sure() {
	var json = {
		"order_id": $("#getOrderId").val(),
		"zt": '25'
	};
	var jsonAjax = {
		"url": "app_updateOrderZT.do",
		"jsonData": json,
		"methodName": "cancelOrderOk"
	};
	getAjaxData(jsonAjax);
}

function cancelOrderOk() {
	mui.toast('取消订单成功');
	document.getElementById("bg1").style.display = "none";
	var page = plus.webview.getWebviewById("me_order");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "me_order.html",
		id: "me_order",
		extras: {
			//"orderId":orderId
		},
		waiting: {
			autoShow: true
		}
	});
}

function payOrder() {
	$("#bg3").css("display", "");
}

function payThisOrder_cancel() {
	document.getElementById("payThisOrder").style.display = "none";
}

function payThisOrder_sure() {
	var json = {
		"order_id": $("#getOrderId").val(),
		"zt": '3'
	};
	var jsonAjax = {
		"url": "app_updateOrderZT.do",
		"jsonData": json,
		"methodName": "payOrderOk"
	};
	getAjaxData(jsonAjax);
}

function payOrderOk() {
	document.getElementById("bg3").style.display = "none";
	claerPage('order_details');
	var page = plus.webview.getWebviewById("me_order");
	if(page) {
		page.evalJS("getOrderIndexData()");
	}
	mui.openWindow({
		url: "me_order.html",
		id: "me_order",
		waiting: {
			autoShow: true
		}
	});
}

var channel = null;
var channels = null;
var pays = {};

function plusReady() {
	// 获取支付通道
	plus.payment.getChannels(function(cs) {
		channels = cs;
	}, function(e) {
		alert("获取支付通道失败：" + e.message);
	});
}
document.addEventListener('plusready', plusReady, false);
var w = null;
//调用支付
function pay(type) {
	var id = type;
	if(isUndefinedAndEmpty(getUserLocalData().user_id)) {
		mui.toast('请重新登录进行充值');
		return;
	}
	var alipayserver = path_url + 'ali_pay.do?money=' + money + '&user_id=' + getUserLocalData().user_id + '&order_ids=' + order_id + ',&type=0';
	var wxpayserver = path_url + 'wx_payApp.do?money=' + money + '&user_id=' + getUserLocalData().user_id + '&order_ids=' + order_id + ',&type=0';
	plus.nativeUI.showWaiting();
	//获取支付通道
	for(var i in channels) {
		if(channels[i].id == id) {
			channel = channels[i];
		}
	}
	if(id == 'alipay') {
		//获取支付通道
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			switch(xhr.readyState) {
				case 4:
					if(xhr.status == 200) {
						plus.payment.request(channel, xhr.responseText, function(result) {
							payOrderOk();
						}, function(error) {
							plus.nativeUI.alert("支付失败");
						});
					} else {
						alert("获取订单信息失败！");
					}
					break;
				default:
					break;
			}
		}
		xhr.open('GET', alipayserver);
		xhr.send();
	} else if(id == 'wxpay') {
		//获取支付通道
		mui.get(wxpayserver, {}, function(data) {
			var varpay = {
				retcode: 0,
				retmsg: "ok",
				appid: data.appid,
				noncestr: data.noncestr,
				package: data.package,
				partnerid: data.partnerid,
				prepayid: data.prepayid,
				timestamp: data.timestamp,
				sign: data.sign
			};
			plus.payment.request(channel, varpay, function(result) {
				payOrderOk();
			}, function(e) {
				plus.nativeUI.alert("支付失败");
			});
		}, "json");
	}
	plus.nativeUI.closeWaiting();

}