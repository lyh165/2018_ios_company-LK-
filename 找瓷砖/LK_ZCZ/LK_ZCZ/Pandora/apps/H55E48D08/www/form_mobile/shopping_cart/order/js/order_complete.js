mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	getDoneOrderDetail(self.orderId);
});

function getDoneOrderDetail(orderId) {
	var user_id = getUserLocalData().user_id;
	var order_id = orderId;
	var json = {
		"user_id": user_id,
		"order_id": order_id
	};
	var jsonAjax = {
		"url": "app_getOrderDetailByOrderId.do",
		"jsonData": json,
		"methodName": "getDoneOrderDetail_back",
	};
	getAjaxData(jsonAjax);
}

function getDoneOrderDetail_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.data);
	var all = strToJson(jsonInfo.data);
	var order = all.order;
	var content = "";
	var proList = strToJson(order.proList);
	$("#getOrderId").val(order.order_id);
	$("#orderCost").html('￥'+order.order_cost);
	$("#addressPerson").html(order.address_person);
	$("#addressPhone").html(order.address_phone);
	$("#addressDetail").html(order.address_detail);
	$("#orderId").html('下单编号：'+order.order_id);
	$("#lrsj").html('下单时间：'+order.lrsj);
	$("#paidPrice").html('实付款:￥'+order.order_cost);
	$("#shopName").html(order.shop_name);
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
function deleteOrder() {
	document.getElementById("bg1").style.display ="";
}

function deleteOrder_cancel() {
	document.getElementById("bg1").style.display = "none";
}

function deleteOrder_sure() {
	//document.getElementById("bg1").style.display = "none";
	//document.getElementById("add").style.display = "none";
	var json = {
			"order_id":$("#getOrderId").val(),
			"zt":'-1'
	};
		var jsonAjax = {
			"url" : "app_updateOrderZT.do",
			"jsonData" : json,
			"methodName" : "cancelOrderOk"		
		};
	getAjaxData(jsonAjax);
}
function cancelOrderOk(){
	mui.toast('删除订单成功');
	document.getElementById("bg1").style.display = "none";
	mui.openWindow({
		url:"me_order.html",
		id:"me_order",
		extras:{
			//"orderId":orderId
		},
		waiting:{
			autoShow:false
		}
	});
}

function returnGoodsApply(){
	var orderId = $("#getOrderId").val()
	//alert(orderId);
	mui.openWindow({
		url:"details.html",
		id:"returnGoodsApply",
		extras:{
			"orderId":orderId
		},
		waiting:{
			autoShow:false
		}
	});
}

function returnMoneyApply(){
	var orderId = $("#getOrderId").val()
	mui.openWindow({
		url:"refunds.html",
		id:"returnMoneyApply",
		extras:{
			"orderId":orderId
		},
		waiting:{
			autoShow:false
		}
	});
}
