var order_id;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	order_id = self.orderId;
});

function TheDelivery() {
	var courier_name = $("#courier_name").val();
	var courier_num = $("#courier_num").val();
	if(isUndefinedAndEmpty(courier_name)) {
		mui.toast("请填写快递公司名称");
		return;
	}
	if(isUndefinedAndEmpty(courier_num)) {
		mui.toast("请填写快递单号");
		return;
	}
	var json = {
		"courier_name": courier_name,
		"courier_num":courier_num,
		"order_id":order_id,
		"zt":"3"
	}
	var jsonAjax = {
		"url": "app_updateBusinessOrderZT.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "TheDelivery_back",
	}
	getAjaxData(jsonAjax);
}

function TheDelivery_back() {
	mui.openWindow({
		url:"invoice_complete.html",
		id:"invoice_complete",
		extras:{
		},
		waiting:{
			autoShow:false
		}
	});
}