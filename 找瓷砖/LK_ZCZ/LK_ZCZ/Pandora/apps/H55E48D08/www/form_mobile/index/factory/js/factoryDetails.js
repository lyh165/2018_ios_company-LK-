var long;
var lat;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	process_id = self.process_id;
	getPro(process_id);
});

var phone;

function back() {
	mui.back();
}
//得到数据源
function getPro(process_id) {
	var json = {
		"process_id": process_id
	}
	var jsonAjax = {
		"url": "app_getFactory.do",
		"jsonData": json,
		"methodName": "getPro_back"
	}
	getAjaxData(jsonAjax);
}

//得到数据回调
function getPro_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	shop_id=data.shop_id;
	phone = data.process_phone;
	$("#user_phone").text(data.phone);
	$("#service").text(data.process_name);
	$("#money").text(data.process_money);
	$("#shopname").text(data.process_name);
	$("#warehouse").text(data.shop_factory_add);
	$("#text1").text(data.shop_profile);
	$("#process_describe").text(data.process_describe);
	var ss = strToJson(data.process_img);
	var img = "";
	for(var k in ss) {
		img += '<img src="' + path_url_img + ss[k] + '" style="width: 21.5rem; margin-top: 0.75rem;" />';

	};
	$("#masterT").html(img);
}

function openAddress() {
	mui.openWindow({
		url: "/form_mobile/index/Location.html",
		id: "Location",
		extras: {
			"shop_id": shop_id
		},
	})
}
/**
 * 电话弹框
 * @param {Object} phone
 */
function changeDelete() {
	$("#user_phone").html(phone);
	$("#phoneTanKuang").css("display", "block");
	$("#playFactoryPhone").attr('href', 'tel:' + phone);
}

function changname_cancel() {
	$("#phoneTanKuang").css("display", "none");
}
/*在线咨询*/
function consulting() {
	mui.toast("暂时未开通，敬请期待!");
}