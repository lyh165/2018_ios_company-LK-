$(function() {
	get_serviceList();
	opemGongsiGrRen();
});

/*******************获取招聘*************************/
function get_serviceList() {
	var jsonAjax = {
		"url": "app_service_index.do",
		"methodName": "get_serviceListResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function get_serviceListResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$("#IndexServiceData").html("");
	if(isUndefinedAndEmpty(data)) {
		$("#IndexServiceData").html('<div style="height: 3.5rem;background: #F0F0F0;"></div>' +
			'<div class="shopping_cart"><img src="../../util/img/geren.gonsi.png" style="width: 2.81rem;"/></div>' +
			'<div class="text1"><span class="text_1">暂无服务内容哦，换个条件试试！</span></div>');
		return;
	}
	var counts = "";
	$.each(data, function(e, obj) {
		var ss = strToJson(obj.shop_subject);
		var shop_subject = "";
		for(var k in ss) {
			shop_subject += '<span class="geren">' + ss[k] + '</span>';
		}
		counts += '<ul id="fuwu" class="content"><li class="wuliu">' +
			'<a style="color: #333333;">' +
			'<span class="shop shop_fuwu" onclick="openServiceDetails(&quot;' + obj.service_id + '&quot;)"><img src="' + path_url_img + obj.service_logo + '"/></span>' +
			'<div class="xiangqing" onclick="openServiceDetails(&quot;' + obj.service_id + '&quot;)"><span>' + obj.service_name + '</span>' + shop_subject +
			'<span class="bianju"></span>' +
			'<span class="xiugai"style="position: absolute;right: 0.5rem;">' + obj.service_money + '元</span>' +
			'<p style="font-size: 0.75REM;">' + obj.shop_name + '</p></div></a>' +
			'<div class="didian didian_one" style="height: 0rem;">' +
			'<span><img src="../../util/img/u13.png" style="width: 0.68rem; vertical-align: middle;"/></span>' +
			'<span class="jiage" onclick="openAddress(&quot;' + obj.shop_id + '&quot;)">' + obj.shop_add + '</span>' +
			'<span class="dianhua" onclick="changeDelete(&quot;' + obj.service_phone + '&quot;)"><img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle;"/></span>' +
			'<div class="fengexian"></div><span class="zhuanweifu"></span>' +
			'<span class="shenhe" style="margin-left: 0.9rem;"></span>' +
			'</div></li></ul><div class="collect-control gongsi">' +
			'<span class="gongsijianli">公司简历</span>' +
			'<span class="jiantou_012 jiantou123"><img src="../../util/img/jiantou.png" style="width: 0.37rem;"/></span>' +
			'<span class="jiantou1_1 jiantou125" style="display: none;"><img src="../../util/img/jiantouxia.png" style="width: 0.68rem;"/></span>' +
			'</div><div class="gongsi1 gongsi_01" style="display: none;">' +
			'<span class="gongsijianli1">公司简历：' + obj.shop_profile + '</span></div>';
	});
	$("#IndexServiceData").html(counts);
	$(document).ready(function() {
		$('.collect-control').click(function(){
			$(this).find('.jiantou123').toggle();
			$(this).next('.gongsi_01').toggle();
			$(this).find('.jiantou125').toggle();
		})
	})
};


/*拨号*/
function changeDelete(phone) {
	$("#user_phone").html(phone);
	$("#phoneTanKuang").css("display", "block");
	$("#playFactoryPhone").attr('href', 'tel:' + phone);
}

function changname_cancel() {
	$("#phoneTanKuang").css("display", "none");
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

/********************工厂所在地***********************************/
$("#service").on('tap',function() {
	var display = $("#all").css("display");
	if(display == 'none') {
		var city = localStorage.getItem("city_name");
		getNameByParentName(city, "", getQuJi);
	} else {
		$("#ul_01").css("display", "none");
		$("#all").css("display", "none");
	}
});

function getQuJi(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '<li id="add1" onclick=getShopFactoryAdd("' + jsonObj.name + '") class="li_1 li_1_action"><span class="">' + jsonObj.name + '</span></li>';
	$.each(data, function(e, obj) {
		content += '	<li id="' + obj.id + '" name="' + obj.name + '" class="li_1  qujixuanze"><div class="li_1_1" style="display: none;"></div><span class="">' + obj.name + '</span></li>';
	});
	$("#ul").html(content);
	$("#all").css("display", "block");
}
mui("body").on("tap", ".qujixuanze", function() {
	$(this).siblings().removeClass("li_1_action");
	$(this).addClass("li_1_action");
	var district = $(this).attr("name");
	var id = $(this).attr("id");
	getNameByParentName(district, id, getXianJi);
});

function getXianJi(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '<li class="li_ul_li" onclick=getShopFactoryAdd("' + jsonObj.name + '")>' + jsonObj.name + '</li>';
	$.each(data, function(e, obj) {
		content += '<li class="li_ul_li" onclick=getShopFactoryAdd("' + obj.name + '")>' + obj.name + '</li>';
	});
	$("#ul_01").html(content);
	$("#ul_01").css("display", "block");
}

function getShopFactoryAdd(name) {
	$("#ul_01").css("display", "none");
	$("#all").css("display", "none");
	var json = {
		"shop_add": name,
	}
	var jsonAjax = {
		"url": "app_service_screening.do",
		"jsonData": json,
		"methodName": "get_serviceListResult",
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}
/********************工厂所在地***********************************/

//个人公司
function opemGongsiGrRen() {
	$("#ul_3").html("");
	var s = '<li class="li_2" onclick="getGerenOrGongsr(&quot; &quot;)"><span class="">不限</span></li>' +
		'<li class="li_2" onclick="getGerenOrGongsr(&quot;个体&quot;)"><span class="">个人</span></li>' +
		' <li class="li_2" onclick="getGerenOrGongsr(&quot;国企&quot;)"><span class="">公司</span></li>';
	$("#ul_3").html(s);
}

function getGerenOrGongsr(name) {
	$("#all2").css('display', 'none');
	$("#ul_2").css('display', 'none');
	console.log(name);
	console.log(name);
	var json = {
		"shop_subject": name
	}
	var jsonAjax = {
		"url": "app_service_screening.do",
		"jsonData": json,
		"methodName": "get_serviceListResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

//服务
function ServiceNameAll(name, id) {

	if(name == "1") {
		name = $("#sheji").val();
	}
	if(name == "2") {
		name = $("#yinshua").val();
	}
	console.log(name);
	console.log(id);
	var json = {
		"service_name": name
	}
	var jsonAjax = {
		"url": "app_service_screening.do",
		"jsonData": json,
		"methodName": "get_serviceListResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}