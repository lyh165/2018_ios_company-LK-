var orderId;
mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	orderId=self.orderId;
	getNoPayOrderDetail(orderId);
});

function getNoPayOrderDetail(orderId) {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id,
		"order_id": orderId
	};
	var jsonAjax = {
		"url": "app_getOrderComment.do",
		"jsonData": json,
		"methodName": "getNoPayOrderDetail_back",
	};
	getAjaxData(jsonAjax);
}

function getNoPayOrderDetail_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.data);
	var all = strToJson(jsonInfo.data);
	var order = all.order;
	var content = "";
	var proList = strToJson(order.proList);
	if (order.zt==2) {
		$("#is_zt").html("等待用户付款");
		$("#is_toMoney").html("需付款：￥");
		$("#is_bogziti").show();
	} else if(order.zt==4){
		$("#is_zt").html("等待发货");
		$("#is_toMoney").html("已付款：￥");
		$("#fahuoa").show();
	}else if(order.zt==3){
		$("#is_zt").html("等待收货");
		$("#is_toMoney").html("已付款：￥");
	}
	$("#getOrderId").val(order.order_id);
	$("#orderCost").html(order.order_cost);
	$("#addressPerson").html(order.address_person);
	$("#addressPhone").html(order.address_phone);
	$("#addressDetail").html(order.address_detail);
	$("#order_id").html('下单编号：'+order.order_id);
	$("#gxsj").html('下单时间：'+order.gxsj);
	$("#shouldPay").html('￥'+order.order_cost);
	if (order.zt==2) {
		$("#shouldPay2").html('需付款:￥'+order.order_cost);
	} else if(order.zt==4){
		$("#shouldPay2").html('已付款:￥'+order.order_cost);
	}else if(order.zt==3){
		$("#shouldPay2").html('已付款:￥'+order.order_cost);
	}
	$("#shopName").html(order.shop_name);
	$.each(proList, function(e,obj) {
		content+='<div class="content_product">';
		content+='<span class="product"><img src="'+path_url_img+obj.product_logo+'" style="width: 3.75rem;"/></span>';
		content+='<div class="content1-text">';
		content+='<span class="content-text1">'+obj.product_name+'</span>';
		content+='<span class="content-text2">'+obj.orderdetail_val+'</span>';
		content+='<span class="number1">x'+obj.product_num+'</span></div></div>';
		
	});
	if (order.zt==2) {
		$("#order_cost").html('需付款:<b>￥'+order.order_cost+'</b>');
	} else if(order.zt==4){
		$("#order_cost").html('已付款:<b>￥'+order.order_cost+'</b>');
	}else if(order.zt==3){
		$("#order_cost").html('已付款:<b>￥'+order.order_cost+'</b>');
	}
	$("#money").html('￥'+order.order_cost);
	$("#proList").html(content);
}

function openfahuo(){
	mui.openWindow({
		url:"invoice/invoice.html",
		id:"invoice",
		extras:{
			"orderId":orderId
		},
		waiting:{
			autoShow:false
		}
	});
}








