$(function() {
	get_recommendation_recruit();
	get_recruit_name(); //招聘岗位
});

/*******************获取招聘*************************/
function get_recommendation_recruit() {
	var jsonAjax = {
		"url": "app_recruit_index.do",
		"methodName": "getRecommendationRecruitResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getRecommendationRecruitResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$("#recruitdata").html("");
	if(isUndefinedAndEmpty(data)) {
		$("#recruitdata").html('<div class="shopping_cart"><img src="../../util/img/zhaopingangwei.png" style="width: 2.81rem;"/></div>' +
			'<div class="text1">' +
			'	<span class="text_1">暂无工作内容哦，换个条件试试！</span>' +
			'</div>');
		return;
	}

	var counts = "";
	$.each(data, function(e, obj) {
		counts += '<ul id="fuwu" class="content">' +
			'<li class="wuliu">' +
			'<div class="" onclick="openRecruitDetails(&quot;' + obj.recruit_id + '&quot;)">' +
			'<span class="shop shop_fuwu" ><img src="' + path_url_img + obj.recruit_logo + '"/></span>' +
			'<div class="xiangqing">' +
			'<span>' + obj.recruit_name + '</span>' +
			'<span class="bianju"></span>' +
			'<p style="font-size: 0.75REM;">' + obj.shop_name + '</p>' +
			'<div class="didian didian_one" style="height: 0rem;">' +
			'<span class="jiage">' + obj.recruit_treatment + '元/月</span>' +
			'<div class="fengexian"></div>' +
			'<span class="zhuanweifu"></span>' +
			'<span class="shenhe" style="margin-left: 0.9rem;"></span>' +
			'</div></div></div>' +
			'<div class="dianhua" onclick="changeDelete(&quot;' + obj.recruit_phone + '	&quot;)"><img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle;"/></div>' +
			'</li></ul><div class="gongsi">' +
			'<span><img src="../../util/img/u13.png" style="width: 0.68rem; vertical-align: middle;"/></span>' +
			'<span class="gongsidizhi" onclick="openAddress(&quot;' + obj.shop_id + '&quot;)" >' + obj.shop_add + '</span>' +
			'<span class="jiantou"><img src="../../util/img/jiantou.png" style="width: 0.37rem;"/></span>' +
			'</div>';
	});

	$("#recruitdata").html(counts);
}

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
		id: "Location",
		extras: {
			"shop_id": shop_id
		},
	})
}
/**
 * 打开工作详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openRecruitDetails(recruit_id) {
	var page = plus.webview.getWebviewById("recruitDetails");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "../details/recruitDetails/position.html",
		"id": "recruitDetails",
		extras: {
			"recruit_id": recruit_id
		}
	});
}

//获取招聘岗位
function get_recruit_name() {
	var jsonAjax = {
		"url": "app_recruit_name.do",
		"methodName": "get_recruit_nameResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function get_recruit_nameResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$("#ul_3").html("");
	var counts = '<li class="li_2" onclick="getRecruitByRecruit_name(&quot; &quot;)"><span class="">不限</span></li>';
	$.each(data, function(e, obj) {
		counts += '<li class="li_2"  onclick="getRecruitByRecruit_name(&quot;' + obj.recruit_name + '&quot;)"><span class="">' + obj.recruit_name + '</span></li>';
	});
	$("#ul_3").html(counts);
}

function getRecruitByRecruit_name(name) {
	$("#all3").css("display", "none");
	var json = {
		"recruit_name": name
	}
	var jsonAjax = {
		"url": "app_recruit_screening.do",
		"jsonData": json,
		"methodName": "getRecommendationRecruitResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

//待遇搜索
function getRecruitByRecruitTreatment(name) {
	$("#all2").css("display", "none");
	var strs = name.split("-"); //字符分割 
	var num1 = strs[0];
	var num2 = strs[1];

	if(num1 == "0") num1 = '';
	if(num2 == "0") num2 = '';
	var json = {
		"StartingSalary": num1,
		"EndOfTheSalary": num2
	}
	var jsonAjax = {
		"url": "app_recruit_screening.do",
		"jsonData": json,
		"methodName": "getRecommendationRecruitResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

/********************获取地址***********************************/
$("#service3").click(function() {
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
	var content = '';
	content = '<li id="add1" onclick=getShopFactoryAdd("' + jsonObj.name + '") class=" li_1 li_1_action"><span class="">' + jsonObj.name + '</span></li>';
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
		"url": "app_recruit_screening.do",
		"jsonData": json,
		"methodName": "getRecommendationRecruitResult",
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}
/********************工厂所在地***********************************/