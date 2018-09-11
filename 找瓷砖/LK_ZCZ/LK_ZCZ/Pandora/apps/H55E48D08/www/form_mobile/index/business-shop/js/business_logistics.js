
//获取商家物流
function getLogisticsByShopId() {
	json = {
		"shop_id": $("#shop_id").val()
	}
	var jsonAjax = {
		"url": "app_logsitics_by_logistics_city_start_by_logistics_city_stop_index.do",
		"jsonData": json,
		"methodName": "getLogisticsByShopIdResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getLogisticsByShopIdResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$("#logisticsdata").html("");
	$.each(data, function(e, obj) {
		var datas = "";

		if(strToJson(obj.logistics_service).ls_1 != null) {
			datas += '<div class="tihuo">' + strToJson(obj.logistics_service).ls_1 + '</div>';
		}
		if(strToJson(obj.logistics_service).ls_2 != null) {
			datas += '<div class="daida">' + strToJson(obj.logistics_service).ls_2 + '</div>';
		}
		if(strToJson(obj.logistics_service).ls_3 != null) {
			datas += '<div class="posun">' + strToJson(obj.logistics_service).ls_3 + '</div>';
		}

		$("#logisticsdata").before('<div>' +
			'	<ul id="" class="content">' +
			'	<input type="text" style="display: none;" value="' + obj.logistics_id + '" id="logistics_id" />' +
			'		<li class="wuliu" onclick="getLogisticsXiangqing(&quot;' + obj.logistics_id + '&quot;)">' +
			'			<span class="shop shop_one"><img src="' + path_url_img + obj.logistics_logo + '"/></span>' +
			'			<div class="xiangqing xiangqing_one">' +
			'				<span>' + obj.logistics_name + '</span>' +
			datas +
			'				<div class="didian">' +
			'					<span class="jiage">￥' + obj.logistics_price + '</span>' +
			'					<span class="danwei">/元吨</span>' +
			'					<span class="gangzhou">' + obj.logistics_city_start + '</span>' +
			'					<span class="jiantou1">→</span>' +
			'					<span class="shaoguan">' + obj.logistics_city_stop + '</span>' +
			'				</div>' +
			'			</div>' +
			'		</li>' +
			'       <li class="dizhi">' +
			'			<span class="dingwei"><img src="../../util/img/u13.png" style="width: 0.75rem;"/></span>' +
			'			<span class="dingweidizhi" onclick="openAddress(&quot;' + obj.shop_add + '&quot;,&quot;' + obj.logistics_name + '&quot;)">' + obj.shop_add + '</span>' +
			'			<span class="dianhua"  onclick="getPhone(&quot;' + obj.logistics_phone + '&quot;)">' +
			'			<img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle; margin-top: 0.3rem;"/></span>' +
			'			<div class="fengexian"></div>' +
			'		</li>' +
			'	</ul>' +
			'</div>');
	});
}

//拨号
function getPhone(phone) {
	if(!isUndefinedAndEmpty(phone)) {
		window.location.href = "tel:" + phone;
	} else {
		mui.toast("暂时未开通，敬请期待")
	}
}

/**
 * 跳转到详情页面
 */
function getLogisticsXiangqing(logsitics_id) {
	var page = plus.webview.getWebviewById("LogisticsDetails");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "../details/logisticsDetails/LogisticsDetails.html",
		id: "LogisticsDetails",
		extras: {
			"logsitics_id": logsitics_id
		}
	});
}