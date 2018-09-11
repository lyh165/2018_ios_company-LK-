//获取商家服务 
function getBusiness_Service() {
	json = {
		"shop_id": $("#shop_id").val()
	}
	var jsonAjax = {
		"url": "app_bussioness_service_index.do",
		"jsonData": json,
		"methodName": "getBusiness_ServiceResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getBusiness_ServiceResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var count = "";
	$("#servicedata").html("");
	$.each(data, function(e, obj) {
		var ss = strToJson(obj.shop_subject);
		var counts = "";
		for(var k in ss) {
			counts += '<span class="geren1" >' + ss[k] + '</span>'
		}
		count += '<ul class="content">' +
			'			<li class="wuliu">' +
			'				<div onclick="openServiceDetails(&quot;' + obj.service_id + '&quot;)">' +
			'					<span class="shop shop_fuwu" ><img src="' + path_url_img + obj.service_logo + '"/></span>' +
			'					<div class="xiangqing">' +
			'							<span>' + obj.service_name + '</span>' + counts +
			'							<span class="bianju"></span>' +
			'							<span class="xiugai"style="position: absolute;right: 0.5rem;">' + obj.service_money + '元<span >/' + obj.service_unit + '</span></span>' +
			'							<p style="font-size: 0.75REM;">' + obj.shop_name + '  </p>' +
			'					</div>' +
			'					</div>' +
			'					<div class="didian didian_one map" style="height: 0rem;">' +
			'					<span><img src="../../util/img/u13.png" style="width: 0.68rem; vertical-align: middle;"/></span>' +
			'					<span class="jiage-1"   onclick="openAddress(&quot;' + obj.shop_add + '&quot;,&quot;' + obj.shop_name + '&quot;)">' + obj.shop_add + '</span>' +
			'					<span class="zhuanweifu"></span>' +
			'					<span class="shenhe" style="margin-left: 0.9rem;"></span>' +
			'					</div>' +
			'					<div class="phone">' +
			'						<span class="dianhua psa" onclick="getPhone(&quot;' + obj.service_phone + '&quot;)"><img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle;"/></span>' +
			'						<div class="fengexian psa"></div>' +
			'					</div>' +
			'				</li>' +
			'				</ul>' +
			'				<div class="collect-control gongsi "  onclick="showgsjl(&quot;' + obj.service_id + '&quot;)">' +
			'					<span class="gongsijianli">公司简历</span>' +
			'					<span class="jiantou_012 jiantou124"id="zj_' + obj.service_id + '"><img src="../../util/img/jiantou.png" style="width: 0.37rem;"/></span>' +
			'					<span class="jiantou1_1 jiantou126" id="xj_' + obj.service_id + '" style="display: none;"><img src="../../util/img/jiantouxia.png" style="width: 0.68rem;"/></span>' +
			'				</div>' +
			'				<div class="gongsi1 gongsi_02" id="jl_' + obj.service_id + '" style="display: none;">' +
			'					<span class="gongsijianli1">' + obj.shop_profile + '</span>' +
			'				</div>';

	});
	$("#servicedata").html(count);
}

function showgsjl(service_id) {
	$("#jl_" + service_id).toggle();
	$("#xj_" + service_id).toggle();
	$("#zj_" + service_id).toggle();
};

//拨号
function getPhone(phone) {
	if(!isUndefinedAndEmpty(phone)) {
		window.location.href = "tel:" + phone;
	} else {
		mui.toast("暂时未开通，敬请期待")
	}
}

/**
 * 打开服务详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openServiceDetails(service_id) {
	var page = plus.webview.getWebviewById("serviceDetails");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "../details/serviceDetails/service.html",
		"id": "serviceDetails",
		extras: {
			"service_id": service_id
		}
	});
}