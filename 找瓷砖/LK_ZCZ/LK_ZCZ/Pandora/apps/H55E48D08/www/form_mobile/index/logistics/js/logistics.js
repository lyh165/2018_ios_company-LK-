/*******************按条件查询物流*************************/
function get_logsiticCheck() {
	var logistics_city_start = $("#showCityPicker3").text();
	var logistics_city_stop = $("#showCityPicker4").text();
	if(isUndefinedAndEmpty(logistics_city_start) || logistics_city_start == "选择出发点") {
		logistics_city_start = "";
	}
	if(isUndefinedAndEmpty(logistics_city_stop) || logistics_city_stop == "选择到达地") {
		logistics_city_stop = '';
	}
	var json = {
		"logistics_city_start": logistics_city_start,
		"logistics_city_stop": logistics_city_stop
	}
	var jsonAjax = {
		"url": "app_logsitics_by_logistics_city_start_by_logistics_city_stop_index.do",
		"jsonData": json,
		"methodName": "get_logsiticCheckResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function get_logsiticCheckResult(jsonObj) {
	$("#logsticsdata").html("");
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	if(data.length == 0) { //没有查到数据
		mui.toast("暂无物流内容哦，换个条件试试！");
		$("#logsticsdata").html('<div class="shopping_cart"><img src="../../util/img/zhaowuliu.png" style="width: 2.81rem;"/></div>' +
			'	<div class="text1">' +
			'	 	<span class="text_1">暂无物流内容哦，换个条件试试！</span>' +
			'	</div>	');
	} else { //查到数据
		var logsticsrs = "";
		$.each(data, function(e, obj) {
			var datas = "";
			if(strToJson(obj.logistics_service).ls_1 != null) {
				datas += '<div class="tihuo">' + strToJson(obj.logistics_service).ls_1 + '</div>';
			}
			if(strToJson(obj.logistics_service).ls_2 != null) {
				datas += '<div class="posun">' + strToJson(obj.logistics_service).ls_2 + '</div>';
			}
			if(strToJson(obj.logistics_service).ls_3 != null) {
				datas += '<div class="daida">' + strToJson(obj.logistics_service).ls_3 + '</div>';
			}

			logsticsrs += '<div ><ul id="" class="content">' +
				'<span class="shop shop_one"><img src="../../util/img/kuayue.png" style="width: 4.4rem"/></span>' +
				'<li class="wuliu">' +
				'<span class="shop shop_one"  onclick="getLogisticsXiangqing(&quot;' + obj.logistics_id + '&quot;)"><img src="' + path_url_img + obj.logistics_logo + '" style="width: 4.4rem"/></span>' +
				'<div class="xiangqing xiangqing_one">' +
				'<span>' + obj.logistics_name + '</span>' +
				datas +
				'<div class="didian">' +
				'<span class="jiage">￥' + obj.logistics_price + '</span>' +
				'<span class="danwei">/元吨</span>' +
				'<span class="gangzhou">' + obj.logistics_city_start + '</span>' +
				'<span class="jiantou">→</span>' +
				'<span class="shaoguan">' + obj.logistics_city_stop + '</span>' +
				'</div></li></a><li class="dizhi">' +
				'<span class="dingwei"><img src="../../util/img/u13.png" style="width: 0.75rem;"/></span>' +
				'<span class="dingweidizhi" onclick="openAddress(&quot;' + obj.shop_id + '&quot;)" >' + obj.shop_add + '</span>' +
				'<span class="dianhua" onclick="changeDelete(&quot;' + obj.logistics_phone + '&quot;)"><img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle;"/></span>' +
				'<div class="fengexian"></div></li></ul></div>';
		});
		$("#logsticsdata").html(logsticsrs);
	}
}
/*拨号*/
function changeDelete(phone) {
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
	mui.openWindow({
		url: "../details/logisticsDetails/LogisticsDetails.html",
		id: "LogisticsDetails",
		extras: {
			"logsitics_id": logsitics_id
		}
	});
}
/*定位*/
function openAddress(shop_id) {
	mui.openWindow({
		url: "/form_mobile/index/Location.html",
		id:"Location",
		extras: {
			"shop_id": shop_id
		},
	})
}