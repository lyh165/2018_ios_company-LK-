var delType = '';
var shop_id = '';
$(function() {
	getMyShopProList();
	getUserShop();
})

function getUserShop() {
	var user_id = getUserLocalData().user_id;
	var json = {
		"user_id": user_id,
	}
	var jsonAjax = {
		"url": "app_shop_getMyShop.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getUserShop_back",
	}
	getAjaxData(jsonAjax);
}

function getUserShop_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	shop_id = data.shop_id;
}

function initData() {
	getUserShop();
	getMyShopProList();
}
//添加列表项的点击事件
mui('#xuanze').on('tap', '#xuanze1', function(e) {
	getMyLogisticsList();
	delType = 'delLogistics';
})

//添加列表项的点击事件
mui('#xuanze').on('tap', '#xuanze2', function(e) {
	getMyShopProList();
	delType = 'delPro';
})

//添加列表项的点击事件
mui('#xuanze').on('tap', '#xuanze3', function(e) {
	getMyGroupList();
	delType = 'delGroup';
})

//添加列表项的点击事件
mui('#xuanze').on('tap', '#xuanze5', function(e) {
	getMyServiceList();
	delType = 'delService';
})

//添加列表项的点击事件
mui('#xuanze').on('tap', '#xuanze4', function(e) {
	getMyFactoryList();
	delType = 'delProcess';
})

//添加列表项的点击事件
mui('#xuanze').on('tap', '#xuanze6', function(e) {
	getMyRecruitList();
	delType = 'delRecruit';
})

/**
 * 获取我的团购列表集合
 */
function getMyGroupList() {
	var userId = getUserLocalData().user_id;
	var json = {
		"user_id": userId,
		"shop_id":shop_id
	}
	var jsonAjax = {
		"url": "app_getMyGroupList.do",
		"jsonData": json,
		"methodName": "getMyGroupList_back"
	}
	getAjaxData(jsonAjax);
}

function getMyGroupList_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	if(data.length == 0) {
		$("#none").css("display", "block");
	} else {
		$("#none").css("display", "none");
	}
	$.each(data, function(e, obj) {
		var zt = '';
		if(obj.zt == '2') {
			zt = '审核通过';
		} else if(obj.zt == '1') {
			zt = '审核中';
		} else if(obj.zt == '0') {
			zt = '未支付';
		}

		content += '<li class="wuliu">';
		content += '<div class="choice choice1" group_id="' + obj.group_id + '" id="shop4" style="display: none;"onclick="checkGroup(this)""></div>';
		content += '<div onclick=openGroupDetail("' + obj.group_id + '","' + obj.zt + '")>';

		content += '<input type="checkbox"style="display:none" id="xuanze4" name="wuliu"/>';
		content += '<span class="shop shop_dizhuan"><img src="' + path_url_img + obj.product_logo + '"/></span>';
		content += '<div class="xiangqing">';
		content += '<span>' + obj.product_name + '</span>';
		content += '<p style="font-size: 0.75REM;">' + obj.sku_name + '</p>';
		content += '<div class="didian">';
		content += '<span class="jiage">￥' + obj.group_price + '</span>';
		content += '<span class="shenhe">' + zt + '</span></div></div>';
		content += '</div>';
		content += '<div class="poab">';
		//content += '<span class="bianju"><img src="../../../form_mobile/util/img/bianji.png"/></span>';
		//content += '<span class="xiugai" onclick=updateMyGroupDetail("' + obj.group_id + '")>修改</span>';
		content += '</div></li>';

	});

	$("#myGroup").html(content);
}

/**
 * 选择物流事件
 */
function checkLogistics(this_) {
	var val = $(this_).attr("class");
	if(val == "choice choice1 active") {
		$(this_).removeClass("active");
		var num = 0;
		$("#mylogistics li").each(function() {
			var flag = $(this).find("div").hasClass("active");
			if(flag) {
				num++;
			}
		});
		if(num == 0) {}
	} else {
		$(this_).addClass("active");

	}
	var proLength = $("#mylogistics li div").length;
	var chooseproLength = $("#mylogistics li div.active").length;
	if(proLength == chooseproLength) {
		$("#shop_all").addClass("active");
	} else {
		$("#shop_all").removeClass("active");
	}
}

/**
 * 选择瓷砖事件
 */
function checkCz(this_) {
	var val = $(this_).attr("class");
	if(val == "choice choice1 active") {
		$(this_).removeClass("active");
		var num = 0;
		$("#myShopPro li").each(function() {
			var flag = $(this).find("div").hasClass("active");
			if(flag) {
				num++;
			}
		});
		if(num == 0) {}
	} else {
		$(this_).addClass("active");
	}
	var proLength = $("#myShopPro li div").length;
	var chooseproLength = $("#myShopPro li div.active").length;
	if(proLength == chooseproLength) {
		$("#shop_all").addClass("active");
	} else {
		$("#shop_all").removeClass("active");
	}
}

/**
 * 选择团购事件
 */
function checkGroup(this_) {
	var val = $(this_).attr("class");
	if(val == "choice choice1 active") {
		$(this_).removeClass("active");
		var num = 0;
		$("#myGroup li").each(function() {
			var flag = $(this).find("div").hasClass("active");
			if(flag) {
				num++;
			}
		});
		if(num == 0) {}
	} else {
		$(this_).addClass("active");
	}
	var proLength = $("#myGroup li div").length;
	var chooseproLength = $("#myGroup li div.active").length;
	if(proLength == chooseproLength) {
		$("#shop_all").addClass("active");
	} else {
		$("#shop_all").removeClass("active");
	}
}

/**
 * 选择加工厂事件
 */
function checkProcess(this_) {
	var val = $(this_).attr("class");
	if(val == "choice choice1 active") {
		$(this_).removeClass("active");
		var num = 0;
		$("#myfactory li").each(function() {
			var flag = $(this).find("div").hasClass("active");
			if(flag) {
				num++;
			}
		});
		if(num == 0) {}
	} else {
		$(this_).addClass("active");
	}
	var proLength = $("#myfactory li div").length;
	var chooseproLength = $("#myfactory li div.active").length;
	if(proLength == chooseproLength) {
		$("#shop_all").addClass("active");
	} else {
		$("#shop_all").removeClass("active");
	}
}

/**
 * 选择服务事件
 */
function checkService(this_) {
	var val = $(this_).attr("class");
	if(val == "choice choice1 active") {
		$(this_).removeClass("active");
		var num = 0;
		$("#myService li").each(function() {
			var flag = $(this).find("div").hasClass("active");
			if(flag) {
				num++;
			}
		});
		if(num == 0) {}
	} else {
		$(this_).addClass("active");

	}
	var proLength = $("#myService li div").length;
	var chooseproLength = $("#myService li div.active").length;
	if(proLength == chooseproLength) {
		$("#shop_all").addClass("active");
	} else {
		$("#shop_all").removeClass("active");
	}
}

/**
 * 选择招聘事件
 */
function checkRecruit(this_) {
	var val = $(this_).attr("class");
	if(val == "choice choice1 active") {
		$(this_).removeClass("active");
		var num = 0;
		$("#myRecruit li").each(function() {
			var flag = $(this).find("div").hasClass("active");
			if(flag) {
				num++;
			}
		});
		if(num == 0) {}
	} else {
		$(this_).addClass("active");

	}
	var proLength = $("#myRecruit li div").length;
	var chooseproLength = $("#myRecruit li div.active").length;
	if(proLength == chooseproLength) {
		$("#shop_all").addClass("active");
	} else {
		$("#shop_all").removeClass("active");
	}
}

/**
 * 选择加工厂
 */
function checkProcess(this_) {
	var val = $(this_).attr("class");
	if(val == "choice choice1 active") {
		$(this_).removeClass("active");
		var num = 0;
		$("#myfactory li").each(function() {
			var flag = $(this).find("div").hasClass("active");
			if(flag) {
				num++;
			}
		});
		if(num == 0) {}
	} else {
		$(this_).addClass("active");

	}
	var proLength = $("#myfactory li div").length;
	var chooseproLength = $("#myfactory li div.active").length;
	if(proLength == chooseproLength) {
		$("#shop_all").addClass("active");
	} else {
		$("#shop_all").removeClass("active");
	}
}

/**
 * 获取我的物流列表集合
 */
function getMyLogisticsList() {
	var userId = getUserLocalData().user_id;
	var json = {
		"user_id": userId
	}
	var jsonAjax = {
		"url": "app_getMyLogisticsList.do",
		"jsonData": json,
		"methodName": "getMyLogisticsList_back"
	}
	getAjaxData(jsonAjax);
}

function getMyLogisticsList_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	if(data.length == 0) {
		$("#none").css("display", "block");
	} else {
		$("#none").css("display", "none");
		$.each(data, function(e, obj) {
			var zt = '';
			if(obj.zt == '2') {
				zt = '审核通过';
			} else if(obj.zt == '1') {
				zt = '审核中';
			} else if(obj.zt == '0') {
				zt = '审核不通过';
			}

			content += '<li class="wuliu">';
			content += '<div class="choice choice1" logistics_id="' + obj.logistics_id + '" id="shop1" style="display: none;"onclick="checkLogistics(this)"></div>';
			content += '<div onclick=openLogistics("' + obj.logistics_id + '","' + obj.zt + '")>';

			content += '<input type="checkbox"style="display:none" id="xuanze" name="wuliu"/>';
			content += '<span class="shop"><img src="' + path_url_img + obj.logistics_logo + '"/></span>';
			content += '<div class="xiangqing">';
			content += '<span>' + obj.logistics_name + '</span>';
			content += '<div class="tihuo"><span>' + obj.logistics_line + '</span></div>';
			content += '<div class="didian mt10">';
			content += '<span class="jiage">￥' + obj.logistics_price + '</span>';
			content += '<span class="gangzhou">' + obj.logistics_city_start + '</span>';
			content += '<span class="jiantou">→</span>';
			content += '<span class="shaoguan">' + obj.logistics_city_stop + '</span>';
			content += '<span class="shenhe">' + zt + '</span></div></div>';
			content += '</div>';
			content += '<div class="poab">';
			content += '<span class="bianju"><img src="../../../form_mobile/util/img/bianji.png"/></span>';
			content += '<span class="xiugai" onclick=updateMyLogisticsDetail("' + obj.logistics_id + '")>修改</span>';
			content += '</div></li>';
			content += '<li class="dizhi"><span class="dingwei"><img src="../../../form_mobile/util/img/u13.png" style="width: 0.75rem;vertical-align: middle;"/></span>';
			content += '<span class="dingweidizhi">' + obj.shop_add + '</span></li><div style="height: 1rem;background: #F0F0F0;"></div>';
		});
	}

	$("#mylogistics").html(content);
}

/**
 * 获取我的商品列表集合
 */
function getMyShopProList() {
	var userId = getUserLocalData().user_id;
	var json = {
		"user_id": userId
	}
	var jsonAjax = {
		"url": "app_getMyShopProList.do",
		"jsonData": json,
		"methodName": "getMyShopProList_back"
	}
	getAjaxData(jsonAjax);
}

function getMyShopProList_back(jsonObj) {

	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	if(data.length == 0) {
		$("#none").css("display", "block");
	} else {
		$("#none").css("display", "none");
		$.each(data, function(e, obj) {
			var zt = '';
			if(obj.zt == '2') {
				zt = '审核通过';
			} else if(obj.zt == '1') {
				zt = '审核中';
			} else if(obj.zt == '0') {
				zt = '审核不通过';
			}
			content += '<li class="wuliu">';
			content += '<div class="choice choice1" product_id="' + obj.product_id + '" id="shop3" style="display: none;"onclick="checkCz(this)"></div>';
			content += '<div onclick=openProDetail("' + obj.product_id + '","' + obj.zt + '")>';
			content += '<input type="checkbox"style="display:none" id="xuanze3" name="wuliu"/>';
			content += '<span class="shop shop_zhaopin"><img src="' + path_url_img + obj.product_logo + '"/></span>';
			content += '<div class="xiangqing">';
			content += '<span>' + obj.product_name + '</span>';
			content += '<span class="bianju"></span>';
			content += '<p style="font-size: 0.75REM;">' + obj.product_attribute_val + '</p>';
			content += '<div class="didian didian_one">';
			content += '<span class="jiage">￥' + obj.sku_money + '</span>';
			content += '<span class="shenhe" style="margin-left: 0.9rem;">' + zt + '</span></div></div>';
			content += '</div>';
			content += '<div class="poab">';
			content += '<span class="bianju"><img src="../../../form_mobile/util/img/bianji.png"/></span>';
			content += '<span class="xiugai" onclick=updateMyProDetail("' + obj.product_id + '")>修改</span>';
			content += '</div></li>';

		});
	}

	$("#myShopPro").html(content);
}

/**
 * 获取我的招聘列表集合
 */
function getMyRecruitList() {
	var userId = getUserLocalData().user_id;
	var json = {
		"user_id": userId
	}
	var jsonAjax = {
		"url": "app_getMyRecruitList.do",
		"jsonData": json,
		"methodName": "getMyRecruitList_back"
	}
	getAjaxData(jsonAjax);
}

function getMyRecruitList_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	if(data.length == 0) {
		$("#none").css("display", "block");
	} else {
		$("#none").css("display", "none");
		$.each(data, function(e, obj) {
			var zt = '';
			if(obj.zt == '2') {
				zt = '审核通过';
			} else if(obj.zt == '1') {
				zt = '审核中';
			} else if(obj.zt == '0') {
				zt = '审核不通过';
			}

			content += '<li class="wuliu">';
			content += '<div class="choice choice1" id="shop7" recruit_id="' + obj.recruit_id + '" style="display: none;"onclick="checkRecruit(this)"></div>';
			content += '<div onclick=openMyRecruitDetail("' + obj.recruit_id + '","' + obj.zt + '")>';

			content += '<input type="checkbox"style="display:none" id="xuanze7" name="wuliu"/>';
			content += '<span class="shop shop_zhaopin"><img src="' + path_url_img + obj.recruit_logo + '"/></span>';
			content += '<div class="xiangqing">';
			content += '<span>' + obj.recruit_name + '</span>';
			content += '<span class="bianju"></span>';
			content += '<p style="font-size: 0.75REM;">' + obj.shop_name + '</p>';
			content += '<div class="didian didian_one">';
			content += '<span class="jiage">￥' + obj.recruit_treatment + '</span>';
			content += '<span class="shenhe" style="margin-left: 0.9rem;">' + zt + '</span></div></div>';
			content += '</div>';
			content += '<div class="poab">';
			content += '<span class="bianju"><img src="../../../form_mobile/util/img/bianji.png"/></span>';
			content += '<span class="xiugai" onclick=updateMyRecruitDetail("' + obj.recruit_id + '")>修改</span>';
			content += '</div></li>';
			content += '<li class="dizhi"><span class="dingwei"><img src="../../../form_mobile/util/img/u13.png" style="width: 0.75rem;vertical-align: middle;"/></span>';
			content += '<span class="dingweidizhi">' + obj.shop_add + '</span></li><div style="height: 1rem;background: #F0F0F0;"></div>';

		});
	}
	$("#myRecruit").html(content);
}

/**
 * 获取我的工厂列表集合
 */
function getMyFactoryList() {
	var userId = getUserLocalData().user_id;
	var json = {
		"user_id": userId
	}
	var jsonAjax = {
		"url": "app_getMyFactoryList.do",
		"jsonData": json,
		"methodName": "getMyFactoryList_back"
	}
	getAjaxData(jsonAjax);
}

function getMyFactoryList_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	if(data.length == 0) {
		$("#none").css("display", "block");
	} else {
		$("#none").css("display", "none");
		$.each(data, function(e, obj) {
			var zt = '';
			if(obj.zt == '2') {
				zt = '审核通过';
			} else if(obj.zt == '1') {
				zt = '审核中';
			} else if(obj.zt == '0') {
				zt = '审核不通过';
			}

			content += '<li class="wuliu">';
			content += '<div class="choice choice1" process_id="' + obj.process_id + '" id="shop5" style="display: none;"onclick="checkProcess(this)"></div>';
			content += '<div onclick=openMyProcessDetail("' + obj.process_id + '","' + obj.zt + '")>';

			content += '<input type="checkbox"style="display:none" id="xuanze5" name="wuliu"/>';
			content += '<span class="shop shop_fuwu"><img src="' + path_url_img + obj.process_logo + '"/></span>';
			content += '<div class="xiangqing">';
			content += '<span>' + obj.process_name + '</span>';
			content += '<span class="bianju"></span>';
			content += '<p style="font-size: 0.75REM;">' + obj.shop_name + '</p>';
			content += '<div class="didian didian_one">';
			content += '<span class="jiage">￥' + obj.process_money + '</span>';
			content += '<span class="shenhe" style="margin-left: 0.9rem;">' + zt + '</span></div></div>';
			content += '</div>';
			content += '<div class="poab">';
			content += '<span class="bianju"><img src="../../../form_mobile/util/img/bianji.png"/></span>';
			content += '<span class="xiugai" onclick=updateMyProcessDetail("' + obj.process_id + '")>修改</span>';
			content += '</div></li>';
			content += '<li class="dizhi"><span class="dingwei"><img src="../../../form_mobile/util/img/u13.png" style="width: 0.75rem;vertical-align: middle;"/></span>';
			content += '<span class="dingweidizhi">' + obj.shop_factory_add + '</span></li><div style="height: 1rem;background: #F0F0F0;"></div>';
		});
	}
	$("#myfactory").html(content);
}

/**
 * 获取我的服务列表集合
 * @param {Object} id
 */
function getMyServiceList() {
	var userId = getUserLocalData().user_id;
	var json = {
		"user_id": userId
	}
	var jsonAjax = {
		"url": "app_getMyServiceList.do",
		"jsonData": json,
		"methodName": "getMyServiceList_back"
	}
	getAjaxData(jsonAjax);
}

function getMyServiceList_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	var content = '';
	if(data.length == 0) {
		$("#none").css("display", "block");
	} else {
		$("#none").css("display", "none");
		$.each(data, function(e, obj) {
			var zt = '';
			if(obj.zt == '2') {
				zt = '审核通过';
			} else if(obj.zt == '1') {
				zt = '审核中';
			} else if(obj.zt == '0') {
				zt = '审核不通过';
			}

			content += '<li class="wuliu">';
			content += '<div class="choice choice1" id="shop6" service_id="' + obj.service_id + '" style="display: none;"onclick="checkService(this)"></div>';
			content += '<div onclick=openMyServiceDetail("' + obj.service_id + '","' + obj.zt + '")>';

			content += '<input type="checkbox"style="display:none" id="xuanze6" name="wuliu"/>';
			content += '<span class="shop shop_fuwu"><img src="' + path_url_img + obj.service_logo + '"/></span>';
			content += '<div class="xiangqing">';
			content += '<span>' + obj.service_name + '</span>';
			content += '<span class="bianju"></span>';
			content += '<p style="font-size: 0.75REM;">' + obj.shop_name + '</p>';
			content += '<div class="didian didian_one">';
			content += '<span class="jiage">￥' + obj.service_money + '</span>';
			content += '<span class="shenhe" style="margin-left: 0.9rem;">' + zt + '</span></div></div>';
			content += '</div>';
			content += '<div class="poab">';
			content += '<span class="bianju"><img src="../../../form_mobile/util/img/bianji.png"/></span>';
			content += '<span class="xiugai" onclick=updateMyServiceDetail("' + obj.service_id + '")>修改</span>';
			content += '</div></li>';
			content += '<li class="dizhi"><span class="dingwei"><img src="../../../form_mobile/util/img/u13.png" style="width: 0.75rem;vertical-align: middle;"/></span>';
			content += '<span class="dingweidizhi">' + obj.shop_add + '</span></li><div style="height: 1rem;background: #F0F0F0;"></div>';
		});
	}
	$("#myService").html(content);
}

/**
 * 删除
 */
function testDelCheck() {
	if(delType == 'delLogistics') {
		var logistics_ids = new Array();
		$("#mylogistics li").each(function() {
			var val = $(this).find("div").attr("class");
			if("choice choice1 active" == val) {
				logistics_ids.push($(this).find("div").attr("logistics_id"));
			}
		});
		if(logistics_ids.length == 0) {
			mui.toast("请选择要删除的物流")
			return;
		}
		var json = {
			"logistics_ids": logistics_ids
		}
		var jsonAjax = {
			"url": "app_deleteLogistics.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "deleteLogistics_back",
		}
		getAjaxData(jsonAjax);
	} else if(delType == 'delGroup') {
		var group_ids = new Array();
		$("#myGroup li").each(function() {
			var val = $(this).find("div").attr("class");
			if("choice choice1 active" == val) {
				group_ids.push($(this).find("div").attr("group_id"));
			}
		});
		if(group_ids.length == 0) {
			mui.toast("请选择要删除的团购")
			return;
		}
		var json = {
			"group_ids": group_ids
		}
		var jsonAjax = {
			"url": "app_deleteGroup.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "deleteGroup_back",
		}
		getAjaxData(jsonAjax);
	} else if(delType == 'delPro') {
		var product_ids = new Array();
		$("#myShopPro li").each(function() {
			var val = $(this).find("div").attr("class");
			if("choice choice1 active" == val) {
				product_ids.push($(this).find("div").attr("product_id"));
			}
		});
		if(product_ids.length == 0) {
			mui.toast("请选择要删除的商品")
			return;
		}
		var json = {
			"my_pro_ids": product_ids
		}
		var jsonAjax = {
			"url": "app_deleteMyPro.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "deletePro_back",
		}
		getAjaxData(jsonAjax);
	} else if(delType == 'delProcess') {
		var process_ids = new Array();
		$("#myfactory li").each(function() {
			var val = $(this).find("div").attr("class");
			if("choice choice1 active" == val) {
				process_ids.push($(this).find("div").attr("process_id"));
			}
		});
		if(process_ids.length == 0) {
			mui.toast("请选择要删除的加工厂")
			return;
		}
		var json = {
			"process_ids": process_ids
		}
		var jsonAjax = {
			"url": "app_deleteProcess.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "deleteProcess_back",
		}
		getAjaxData(jsonAjax);
	} else if(delType == 'delService') {
		var service_ids = new Array();
		$("#myService li").each(function() {
			var val = $(this).find("div").attr("class");
			if("choice choice1 active" == val) {
				service_ids.push($(this).find("div").attr("service_id"));
			}
		});
		if(service_ids.length == 0) {
			mui.toast("请选择要删除的服务")
			return;
		}
		var json = {
			"service_ids": service_ids
		}
		var jsonAjax = {
			"url": "app_deleteService.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "deleteService_back",
		}
		getAjaxData(jsonAjax);
	} else if(delType == 'delRecruit') {
		var recruit_ids = new Array();
		$("#myRecruit li").each(function() {
			var val = $(this).find("div").attr("class");
			if("choice choice1 active" == val) {
				recruit_ids.push($(this).find("div").attr("recruit_id"));
			}
		});
		if(recruit_ids.length == 0) {
			mui.toast("请选择要删除的招聘信息")
			return;
		}
		var json = {
			"recruit_ids": recruit_ids
		}
		var jsonAjax = {
			"url": "app_deleteRecruit.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "deleteRecruit_back",
		}
		getAjaxData(jsonAjax);
	}
}

function deleteLogistics_back() {
	getMyLogisticsList()
}

function deleteRecruit_back() {
	getMyRecruitList()
}

function deleteService_back() {
	getMyServiceList()
}

function deleteProcess_back() {
	getMyFactoryList()
}

function deletePro_back() {
	getMyShopProList()
}

function deleteGroup_back() {
	getMyGroupList()
}

/**
 * 修改团购事件
 * @param {Object} groupId
 */
function updateMyGroupDetail(groupId) {
	var group_id = groupId;
	mui.openWindow({
		url: "../../mine/tuangou/editMyGroup.html",
		id: "editMyGroup",
		extras: {
			"groupId": group_id
		},
	});
}
/**
 * 修改物流事件
 * @param {Object} groupId
 */
function updateMyLogisticsDetail(logisticsId) {
	var logistics_id = logisticsId;
	mui.openWindow({
		url: "../../mine/woyaokaidian/chuangjianwuliu.html",
		id: "chuangjianwuliu",
		extras: {
			"logistics_id": logistics_id
		},
	});
}
/**
 * 修改瓷砖事件
 * @param {Object} groupId
 */
function updateMyProDetail(productId) {
	var product_id = productId;
	mui.openWindow({
		url: "../../mine/woyaokaidian/woyaofabucizhuan.html",
		id: "woyaofabucizhuan",
		extras: {
			"product_id": product_id
		},
	});
}

/**
 * 修改加工厂事件
 * @param {Object} groupId
 */
function updateMyProcessDetail(processId) {
	var process_id = processId;
	mui.openWindow({
		url: "../../mine/woyaokaidian/userProcess.html",
		id: "userProcess",
		extras: {
			"process_id": process_id
		},
	});
}

/**
 * 修改服务事件
 * @param {Object} groupId
 */
function updateMyServiceDetail(serviceId) {
	var service_id = serviceId;
	mui.openWindow({
		url: "../../mine/woyaokaidian/woyaofabufuwu.html",
		id: "woyaofabufuwu",
		extras: {
			"service_id": service_id
		},
	});
}

/**
 * 修改招聘事件
 * @param {Object} groupId
 */
function updateMyRecruitDetail(recruitId) {
	var recruit_id = recruitId;
	mui.openWindow({
		url: "../../mine/woyaokaidian/woyaofabuzhaopin.html",
		id: "woyaofabuzhaopin",
		extras: {
			"recruit_id": recruit_id
		},
	});
}

/**
 * 打开物流详情
 * @param {Object} groupId
 */
function openLogistics(Id, zt) {
	if(zt == 2) {
		mui.openWindow({
			url: "../../index/details/logisticsDetails/LogisticsDetails.html",
			id: "LogisticsDetails",
			extras: {
				"logsitics_id": Id
			},
		});
	} else {
		alert("商品还没通过审核！");
	}

}
/**
 * 打开瓷砖详情
 * @param {Object} groupId
 */
function openProDetail(Id, zt) {
	if(zt == 2) {
		mui.openWindow({
			url: "../../index/details/shopProDetails/shop.html",
			id: "shop",
			extras: {
				"shop_id": shop_id,
				"product_id": Id,
			},
		});
	} else {
		alert("商品还没通过审核！");
	}

}
/**
 * 打开团购详情
 * @param {Object} groupId
 */
function openGroupDetail(Id, zt) {
	mui.openWindow({
		url: "../../mine/tuangou/tuanguoxiangqing.html",
		id: "tuanguoxiangqing",
		extras: {
			"groupId": Id,
			"zt":zt
		},
	});
}
/**
 * 打开加工厂详情
 * @param {Object} groupId
 */
function openMyProcessDetail(Id, zt) {
	if(zt == 2) {
		mui.openWindow({
			url: "../../index/factory/factoryDetails.html",
			id: "factoryDetails",
			extras: {
				"process_id": Id
			},
		});
	} else {
		alert("商品还没通过审核！");
	}

}
/**
 * 打开服务详情
 * @param {Object} groupId
 */
function openMyServiceDetail(Id, zt) {
	if(zt == 2) {
		mui.openWindow({
			url: "../../index/details/serviceDetails/service.html",
			id: "service",
			extras: {
				"service_id": Id
			},
		});
	} else {
		alert("商品还没通过审核！");
	}

}
/**
 * 打开招聘详情
 * @param {Object} groupId
 */
function openMyRecruitDetail(Id, zt) {
	if(zt == 2) {
		mui.openWindow({
			url: "../../index/details/recruitDetails/position.html",
			id: "position",
			extras: {
				"recruit_id": Id
			},
		});
	} else {
		alert("商品还没通过审核！");
	}

}