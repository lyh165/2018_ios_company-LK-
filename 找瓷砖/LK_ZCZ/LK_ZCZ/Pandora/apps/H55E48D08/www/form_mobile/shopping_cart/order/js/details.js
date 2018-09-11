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
	$("#order_cost1").val(order.order_cost);
	$("#order_cost").html('￥'+order.order_cost);
	$.each(proList, function(e,obj) {
		content+='<div class="content_product">';
		content+='<span class="product"><img src="'+path_url_img+obj.product_logo+'" style="width: 3.75rem;"/></span>';
		content+='<div class="content1-text">';
		content+='<div class="content-text1">'+obj.product_name+'</div>';
		content+='<span class="content-text2">'+obj.orderdetail_val+'</span>';
		content+='<span class="number1">x'+obj.product_num+'</span></div></div>';
	});
	$("#proList").html(content);
}

function sureReturnGoods(){
	var orderId = $("#getOrderId").val();
	var orderRefundExamine = $("#order_cost1").val();
	var orderRefundReason = $("#order_refund_reason").val();
	var orderRefundPerson =$("#order_refund_person").val();
	var orderRefundPhone = $("#order_refund_phone").val();
	if(isUndefinedAndEmpty(orderId)){
		mui.toast('没有查询到该订单数据');
		return ;
	}
	if(isUndefinedAndEmpty(orderRefundReason)){
		mui.toast('请填写退货原因');
		return ;
	}
	if(isUndefinedAndEmpty(orderRefundPerson)){
		mui.toast('请填写退货联系人');
		return ;
	}
	if(isUndefinedAndEmpty(orderRefundPhone)||!validateElement("mobile", orderRefundPhone)){
		mui.toast('请填写联系方式');
		return ;
	}
	var json = {
		"order_id":$("#getOrderId").val(),
		"order_refund_reason":orderRefundReason,
		"order_refund_person":orderRefundPerson,
		"order_refund_phone":orderRefundPhone
		
	}
	var jsonAjax = {
		"url" : "app_returnGoodsApply.do",
		"jsonData" : json,
		"methodName" : "returnGoodsApplyOK_back",
		
	};
	getAjaxData(jsonAjax);
}

function returnGoodsApplyOK_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.info);
	if(jsonInfo=="操作失败"){
		mui.toast('提交退货申请失败');
	}else{
		mui.toast('提交退货申请成功');
		mui.openWindow({
		url:"refund_application.html",
		id:"refund_application",
		extras:{
			//"orderId":orderId
		},
		waiting:{
			autoShow:false
		}
	});
	}
	
}
