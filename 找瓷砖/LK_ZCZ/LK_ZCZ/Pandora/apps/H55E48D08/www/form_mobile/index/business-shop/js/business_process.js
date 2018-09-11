//获取商家加工厂
function getBusiness_Process() {
	json = {
		"shop_id": $("#shop_id").val()
	}
	var jsonAjax = {
		"url": "app_bussioness_process_index.do",
		"jsonData": json,
		"methodName": "getBusiness_ProcessResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getBusiness_ProcessResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var count = "";
	$("#processdata").html("");
	$.each(data, function(e, obj) {
		var ss = strToJson(obj.shop_subject);
		var counts = "";
		for(var k in ss) {
			counts += '<span class="geren" >' + ss[k] + '</span>'
		}
		count += '<ul class="content">' +
			'<li class="wuliu">' +
			'<div onclick="openDetails(&quot;' + obj.process_id + '&quot;)">' +
			'<span class="shop shop_gongchang1" ><img src="' + path_url_img + obj.process_logo + '"/></span>' +
			'<div class="xiangqing">' +
			'<span>' + obj.process_name + '</span>' + counts +
			'<span class="bianju"></span>' +
			'<span class="xiugai"style="position: absolute;right: 0.5rem;">' + obj.process_money + '元<span>/' + obj.process_unit + '</span></span>' +
			'<p style="font-size: 0.75REM;">' + obj.shop_name + '</p>' +
			'</div></div>' +
			'<div class="didian didian_one map" style="height: 0rem;">' +
			'<span><img src="../../util/img/u13.png" style="width: 0.68rem; vertical-align: middle;"/></span>' +
			'<span class="jiage-1"  onclick="openAddress(&quot;' + obj.shop_add + '&quot;,&quot;' + obj.process_name + '&quot;)">' + obj.shop_add + '</span>' +
			'<span class="zhuanweifu"></span>' +
			'<span class="shenhe" style="margin-left: 0.9rem;"></span>' +
			'/div><div class="phone">' +
			'<span class="dianhua psa" onclick="getPhone(&quot;' + obj.process_phone + '&quot;)"><img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle;"/></span>' +
			'<div class="fengexian psa"></div>' +
			'</div></li></ul>' +
			'<div class="collect-control gongsi" onclick="showgsjl(' + obj.process_id + ')">' +
			'<span class="gongsijianli">公司简历</span>' +
			'<span class="jiantou_012 jiantou123" id="zj_' + obj.process_id + '"><img src="../../util/img/jiantou.png" style="width: 0.37rem;"/></span>' +
			'<span class="jiantou1_1 jiantou125" id="xj_' + obj.process_id + '" style="display: none;"><img src="../../util/img/jiantouxia.png" style="width: 0.68rem;"/></span>' +
			'</div>' +
			'<div class="gongsi1 gongsi_01" id="jl_' + obj.process_id + '" style="display: none;">' +
			'<span class="gongsijianli1">' + obj.shop_profile + '</span></div>';
	});
	$("#processdata").html(count);
	$('.collect-control').click(function() {
		$(this).find('.jiantou123').toggle();
		$(this).next('.gongsi_01').toggle();
		$(this).find('.jiantou125').toggle();
	})
};

function showgsjl(process_id) {
	$("#jl_" + process_id).toggle();
	$("#xj_" + process_id).toggle();
	$("#zj_" + process_id).toggle();
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
 * 打开工厂详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openDetails(process_id) {
	mui.openWindow({
		url: "../factory/factoryDetails.html",
		"id": "factoryDetails",
		extras: {
			"process_id": process_id
		}
	});
}
/*定位*/
function openAddress(shop_add, name) {
	mui.openWindow({
		url: "/form_mobile/index/Location.html",
		id: "Location",
		extras: {
			"shop_id": $("#shop_id").val()
		},
	})
}