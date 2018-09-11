mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	getServiceData(self.service_id);
});

function initData() {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		getServiceData(self.service_id);
	});
}

//通过招聘编号获取工作详情
function getServiceData(service_id) {
	var json = {
		"service_id": service_id
	}
	var jsonAjax = {
		"url": "app_bussioness_service_id_By_id.do",
		"jsonData": json,
		"methodName": "getServiceByIdResults",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getServiceByIdResults(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	shop_id=data.shop_id;
	$("#service_phone").val(data.service_phone);
	$("#service_name").html(data.service_name);
	$("#service_money").text(data.service_money + "元");
	$("#shop_name").text(data.shop_name);
	$("#shop_add").text(data.shop_add);
	$("#serviceImg").attr("src", path_url_img + data.service_img);
	$("#service_describe").text(data.service_describe);
	var ss = strToJson(data.service_img);
	var img = "";
	for(var k in ss) {
		img += '<img src="' + path_url_img + ss[k] + '" style="width: 21.5rem; margin-top: 0.75rem;" />';
	};
	$("#serviceDetails").html(img);
}
/**
 * 电话弹框
 * @param {Object} phone
 */
function changeDelete() {
	var phone = $("#service_phone").val();
	$("#user_phone").html(phone);
	$("#phoneTanKuang").css("display", "block");
	$("#playFactoryPhone").attr('href', 'tel:' + phone);
}

function changname_cancel() {
	$("#phoneTanKuang").css("display", "none");
}
/*定位*/
function openAddress() {
	mui.openWindow({
		url: "/form_mobile/index/Location.html",
		id:"Location",
		extras: {
			"shop_id": shop_id
		},
	})
}