mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	getRecruitData(self.recruit_id);
});

function initData() {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		getRecruitData(self.recruit_id);
	});
}

//通过招聘编号获取工作详情
function getRecruitData(id) {
	var json = {
		"recruit_id": id
	}
	var jsonAjax = {
		"url": "app_business_recruit_by_id.do",
		"jsonData": json,
		"methodName": "getRecruitByIdResults",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getRecruitByIdResults(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	shop_id=data.shop_id;
	$("#recruit_phone").val(data.recruit_phone);
	$("#recruit_name").text(data.recruit_name);
	$("#recruit_treatment").text(data.recruit_treatment);
	$("#shop_name").text(data.shop_name);
	$("#shop_add").text(data.shop_add);
	$("#recruit_requirement").text(data.recruit_requirement);
}
/**
 * 电话弹框
 * @param {Object} phone
 */
function changeDelete() {
	var phone = $("#recruit_phone").val();
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