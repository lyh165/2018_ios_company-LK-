$(function() {
	getCarProList();
});

function back() {
	mui.back();
}

//得到数据源
function getCarProList() {
	var jsonAjax = {
		"url": "app_getProcessList.do",
		"methodName": "getFactory_back"
	}
	getAjaxData(jsonAjax);
}

function getFactory_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	$.each(data, function(e, obj) {
		var su = strToJson(obj.shop_subject);
		var shop_subject = "";
		for(var k in su) {
			shop_subject += '<span class="geren">' + su[k] + '</span>';
		}
		content += '<ul id="fuwu" class="content"><li class="wuliu"><a style="color: #333333;">';
		content += '<span class="shop shop_fuwu" onclick=openPro("' + obj.process_id + '")><img src="' + path_url_img + obj.process_logo + '"/></span>';
		content += '<div class="xiangqing" onclick=openPro("' + obj.process_id + '")>';
		content += '<span>' + obj.process_name + '</span>'+shop_subject;
		content += '<span class="bianju"></span>';
		content += '<span class="xiugai"style="position: absolute;right: 0.5rem;">￥'+obj.process_money+'</span>';
		content += '<p style="font-size: 0.75REM;">' + obj.shop_name + '</p></div></a>';
		content += '<div class="didian didian_one" style="height: 0rem;">';
		content += '<span><img src="../../util/img/u13.png" style="width: 0.68rem; vertical-align: middle;"/></span>';
		content += '<span class="jiage" onclick="openAddress(&quot;' + obj.shop_factory_add + '&quot;,&quot;' + obj.shop_name + '&quot;)">' + obj.shop_factory_add + '</span>';
		content += '<span class="dianhua" onclick=playPhone("' + obj.process_phone + '")><img src="../../util/img/dianhua.png" style="width: 1.31rem; vertical-align: middle;"/></span>';
		content += '<div class="fengexian"></div>';
		content += '<span class="zhuanweifu"></span>';
		content += '<span class="shenhe" style="margin-left: 0.9rem;"></span></div></li></ul>';
		content += '<div class="collect-control gongsi" onclick=jianjie("' + obj.process_id + '")>';
		content += '<span class="gongsijianli">公司简介</span>';
		content += '<span class="jiantou_012 jiantou123" id="jianjie_1_' + obj.process_id + '" style="display: block;"><img src="../../util/img/jiantou.png" style="width: 0.37rem;"/></span>';
		content += '<span class="jiantou1_1 jiantou125" id="jianjie_2_' + obj.process_id + '" style="display: none;"><img src="../../util/img/jiantouxia.png" style="width: 0.68rem;"/></span></div>';
		content += '<div class="gongsi1 gongsi_01" id="jianjie_3_' + obj.process_id + '" style="display: none;">';
		content += '<span class="gongsijianli1">' + obj.shop_profile + '</span>';
		content += '</div>';
	});
	$("#xunhuan").html(content);
}
/**
 * 公司简介
 */
function jianjie(id) {
	var jianjie_1 = $("#jianjie_1_" + id).css("display");
	if(jianjie_1 == 'block') {
		$("#jianjie_1_" + id).css("display", "none");
		$("#jianjie_2_" + id).css("display", "block");
		$("#jianjie_3_" + id).css("display", "block");
	} else {
		$("#jianjie_1_" + id).css("display", "block");
		$("#jianjie_2_" + id).css("display", "none");
		$("#jianjie_3_" + id).css("display", "none");
	}
}

/**
 * 电话弹框
 * @param {Object} phone
 */
function playPhone(phone) {
	$("#user_phone").html(phone);
	$("#phoneTanKuang").css("display", "block");
	$("#playFactoryPhone").attr('href', 'tel:' + phone);
}

function changname_cancel() {
	$("#phoneTanKuang").css("display", "none");
}
/**
 * 打开工厂详情页面
 * @param {Object} getId
 * @param {Object} up_id
 */
function openPro(process_id) {
	mui.openWindow({
		url: "factoryDetails.html",
		extras: {
			"process_id": process_id
		}
	});
}
/********************工厂所在地***********************************/
document.getElementById('address').addEventListener('tap', function() {
	var display = $("#addressUl").css("display");
	if(display == 'none') {
		var city = localStorage.getItem("city_name");
		getNameByParentName(city, "", getQuJi);
	} else {
		$("#ul_10").css("display", "none");
		$("#addressUl").css("display", "none");
	}
})

function getQuJi(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '<li onclick=getShopFactoryAdd("' + jsonObj.name + '")><span>' + jsonObj.name + '</span></li>';
	$.each(data, function(e, obj) {
		content += '<li class="qujixuanze" id="' + obj.id + '" name="' + obj.name + '"><span>' + obj.name + '</span></li>';
	});
	$("#addressUl").html(content);
	$("#addressUl").css("display", "block");
}
mui("body").on("tap", ".qujixuanze", function() {
	$(this).siblings().removeClass("li_1");
	$(this).addClass("li_1");
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
	$("#ul_10").html(content);
	$("#ul_10").css("display", "block");
}

function getShopFactoryAdd(name) {
	$("#ul_10").css("display", "none");
	$("#addressUl").css("display", "none");
	var json = {
		"shop_factory_add": name,
	}
	var jsonAjax = {
		"url": "app_getProcessList.do",
		"jsonData": json,
		"methodName": "getFactory_back",
		"is_login": "n"
	};
	getAjaxData(jsonAjax);
}
/********************工厂所在地***********************************/
