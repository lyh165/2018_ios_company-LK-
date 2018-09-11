mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	getGroupDetail(self.groupId);
	$("#group_id").val(self.groupId);
	if(!isUndefinedAndEmpty(self.zt)){
		$(".button").hide();
	}
});

/**
 * 团购详情初始化
 * @param {Object} id
 */
function getGroupDetail(id) {
	var json = {
		"group_id": id,
	}
	var jsonAjax = {
		"url": "app_getGroupDetail.do",
		"jsonData": json,
		"methodName": "getGroupDetail_back"
	}
	getAjaxData(jsonAjax);
}

function getGroupDetail_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var obj = strToJson(json.data);
	$("#groupId").val(obj.group_id);
	$("#skuId").html(obj.sku_id);
	$("#groupHead").html(obj.user_name + '发起了团购,快来围观啊,好货不等人.');
	$("#groupBrowse").html(obj.group_browse + '人浏览');
	$("#productImg").attr("src", path_url_img + obj.product_logo);
	$("#productName").html(obj.product_name);
	$("#skuName").html(obj.orderdetail_val);
	$("#skuMoney").html('￥' + obj.sku_money);
	$("#groupNum").html('团购总数量：' + obj.group_num);
	$("#lessNum").html('团购剩余数量：' + obj.sun);
	$("#groupPrice").html('团购价格：' + obj.group_price);
	$("#groupStartTime").html('团购开始时间：' + obj.group_strat_time);
	$("#groupEndTime").html('团购结束时间：' + obj.group_stop_time);
	$("#groupBz").html(obj.bz);
}

function openAddGroupLogPage() {
	var groupId = $("#groupId").val();
	mui.openWindow({
		url: "faqituangou.html",
		id: "faqituangou",
		extras: {
			"groupId": groupId
		},
	});
}