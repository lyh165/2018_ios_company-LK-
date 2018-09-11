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

function sureReturnMoney(){
	var orderId = $("#getOrderId").val();
	var orderRefundPayExamine = $("#order_cost1").val();
	var orderRefundPayReason = $("#order_refund_pay_reason").val();
	var orderRefundPayPerson =$("#order_refund_pay_person").val();
	var orderRefundPayPhone = $("#order_refund_pay_phone").val();
	if(isUndefinedAndEmpty(orderId)){
		mui.toast('没有查询到该订单数据');
		return ;
	}
	if(isUndefinedAndEmpty(orderRefundPayReason)){
		mui.toast('请填写退货原因');
		return ;
	}
	if(isUndefinedAndEmpty(orderRefundPayPerson)){
		mui.toast('请填写退货联系人');
		return ;
	}
	if(isUndefinedAndEmpty(orderRefundPayPhone)){
		mui.toast('请填写联系方式');
		return ;
	}
	if(!numberTest(orderRefundPayPhone)){
		mui.toast('手机格式不对');
		return;
	}
	var json = {
		"order_id":$("#getOrderId").val(),
		"order_refund_pay_reason":orderRefundPayReason,
		"order_refund_pay_person":orderRefundPayPerson,
		"order_refund_pay_phone":orderRefundPayPhone,
		"order_refund_pay_examine":orderRefundPayExamine
	}
	var jsonAjax = {
		"url" : "app_returnMoneyApply.do",
		"jsonData" : json,
		"methodName" : "returnMoneyApplyOK_back",
		
	};
	getAjaxData(jsonAjax);
}

function returnMoneyApplyOK_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.info);
	if(jsonInfo=="操作失败"){
		mui.toast('提交退款申请失败');
	}else{
		mui.toast('提交退款申请成功');
		mui.openWindow({
		url:"refund_application1.html",
		//id:"cancelOrderOk",
		extras:{
			//"orderId":orderId
		},
		waiting:{
			autoShow:false
		}
	});
	}
	
}


function numberTest(str){
	  var reg=new RegExp(/^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[0-9]\d{8}?$|17[0-9]\d{8}?$|18[0-9]\d{8}?$|147\d{8}?$/);
	  if(reg.test(str)){
	    return true;
	  }else{
	   return false;
	  }
 }
