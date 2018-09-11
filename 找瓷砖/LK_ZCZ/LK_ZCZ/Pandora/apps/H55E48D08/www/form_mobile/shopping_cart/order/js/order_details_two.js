mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	getSureGetOrderDetail(self.orderId);
});

function getSureGetOrderDetail(orderId) {
	var user_id = getUserLocalData().user_id;
	var order_id = orderId;
	var json = {
		"user_id": user_id,
		"order_id": order_id
	};
	var jsonAjax = {
		"url": "app_getOrderDetailByOrderId.do",
		"jsonData": json,
		"methodName": "getSureGetOrderDetail_back",
	};
	getAjaxData(jsonAjax);
}

function getSureGetOrderDetail_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.data);
	var all = strToJson(jsonInfo.data);
	var order = all.order;
	var content = "";
	var proList = strToJson(order.proList);
	$("#getOrderId").val(order.order_id);
	$("#orderCost").html('已付款:￥'+order.order_cost);
	$("#addressPerson").html(order.address_person);
	$("#addressPhone").html(order.address_phone);
	$("#addressDetail").html(order.address_detail);
	$("#orderId").html('下单编号：'+order.order_id);
	$("#lrsj").html('下单时间：'+order.lrsj);
	$("#shouldPay").html('￥'+order.order_cost);
	$("#shouldPay1").html('￥'+order.order_cost);
	$("#shopName").html(order.shop_name);
	$("#proBz").val(order.bz);
	$.each(proList, function(e,obj) {
		content+='<div class="content_product">';
		content+='<span class="product"><img src="'+path_url_img+obj.product_logo+'" style="width: 3.75rem;"/></span>';
		content+='<div class="content1-text">';
		content+='<span class="content-text1">'+obj.product_name+'</span>';
		content+='<span class="content-text2">'+obj.orderdetail_val+'</span>';
		content+='<span class="number1">x'+obj.product_num+'</span></div></div>';
		
	});
	$("#proList").html(content);
}

/**
 * 取消订单
 */
function cancelOrder() {
	document.getElementById("bg1").style.display ="";
}

function cancelOrder_cancel() {
	document.getElementById("bg1").style.display = "none";
}

function cancelOrder_sure() {
	var json = {
			"order_id":$("#getOrderId").val(),
			"zt":'25'
	};
		var jsonAjax = {
			"url" : "app_updateOrderZT.do",
			"jsonData" : json,
			"methodName" : "cancelOrderOk"		
		};
	getAjaxData(jsonAjax);
}
function cancelOrderOk(){
	document.getElementById("bg1").style.display = "none";
	mui.toast('取消订单成功');
	var page = plus.webview.getWebviewById("me_order");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url:"me_order.html",
		id:"me_order",
		extras:{
			//"orderId":orderId
		},
		waiting:{
			autoShow:true
		}
	});
}

/**
 * 确定收货
 */
function changeDelemai() {
	document.getElementById("bg123").style.display ="";
}
function sureget_cancel1() {
	document.getElementById("bg123").style.display = "none";
}

function sureget_sure1() {
	
	var json = {
			"order_id":$("#getOrderId").val(),
			"zt":'5'
	};
		var jsonAjax = {
			"url" : "app_updateOrderZT.do",
			"jsonData" : json,
			"methodName" : "sureGetOk"		
		};
	getAjaxData(jsonAjax);
}
function sureGetOk(){
	mui.toast('确定收货成功');
	$("#bg123").hide();
	mui.openWindow({
		url:"me_order.html",
		id:"me_order",
		extras:{
			"num":4
		},
		waiting:{
			autoShow:true
		}
	});
}