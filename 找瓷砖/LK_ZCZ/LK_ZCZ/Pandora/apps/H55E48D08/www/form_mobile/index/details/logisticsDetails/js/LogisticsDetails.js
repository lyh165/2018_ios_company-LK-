mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	getlogsiticsData(self.logsitics_id);
});

function initData() {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		getlogsiticsData(self.logsitics_id);
	});
}

//通过物流编号获取物流数据
function getlogsiticsData(id) {
	var json = {
		"logsitics_id": id
	}
	var jsonAjax = {
		"url": "app_logsitics_by_logistics_city_start_by_logistics_city_stop_index.do",
		"jsonData": json,
		"methodName": "get_logsiticCheckResults",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function get_logsiticCheckResults(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);

	$.each(data, function(e, obj) {
		$("#logistics_name").text(obj.logistics_name);
		$("#logistics_price").text(obj.logistics_price);
		$("#shop_add").text(obj.shop_add);
		$("#logistics_phone").val(obj.logistics_phone);
		$("#logistics_describe").text(obj.logistics_describe);
		$("#logsitics_add").text(obj.logistics_city_start + "→" + obj.logistics_city_stop);
		shop_id=obj.shop_id;
		var logistics_services = strToJson(obj.logistics_service);

		var datas = "";
		if(!isUndefinedAndEmpty(logistics_services[1])) {
			datas += '<span class="xinxi">' + logistics_services[1] + '</span>';
		}
		if(!isUndefinedAndEmpty(logistics_services[2])) {
			datas += '<span class="xinxi1">' + logistics_services[2] + '</span>';
		}
		if(!isUndefinedAndEmpty(logistics_services[3])) {
			datas += '<span class="xinxi2">' + logistics_services[3] + '</span>';
		}
		$("#text_03").html(datas);
		//需加判断
		var logistics_imgs = strToJson(obj.logistics_img);
		var datas_2 = "";
		if(logistics_imgs[1] != null) {
			datas_2 += '<div><img src="' + path_url_img + logistics_imgs[1] + '" style="width: 21.5rem; margin-top: 1rem;" /></div>';
		}
		if(logistics_imgs[2] != null) {
			datas_2 += '<div><img src="' + path_url_img + logistics_imgs[2] + '" style="width: 21.5rem; margin-top: 1rem;" /></div>';
		}
		if(logistics_imgs[3] != null) {
			datas_2 += '<div><img src="' + path_url_img + logistics_imgs[3] + '" style="width: 21.5rem; margin-top: 1rem;" /></div>';
		}
		$("#zhiwei").html(datas_2);
	});
}

/**
 * 电话弹框
 * @param {Object} phone
 */
function changeDelete() {
	var phone = $("#logistics_phone").val();
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
		id: "Location",
		extras: {
			"shop_id": shop_id
		},
	})
}