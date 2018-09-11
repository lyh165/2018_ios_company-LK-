var logistics_id = '';

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	logistics_id = self.logistics_id;
	if(!isUndefinedAndEmpty(logistics_id)) {
		getLogisticsById(logistics_id);
	}
});

function getLogisticsById(logistics_id) {
	var json = {
		"logistics_id": logistics_id,
	}
	var jsonAjax = {
		"url": "app_getUserLogisticsById.do",
		"jsonData": json,
		"methodName": "getLogisticsById_back",
	}
	getAjaxData(jsonAjax);
}

function getLogisticsById_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	$("#logistics_name").val(data.logistics_name);
	$("#logistics_line").val(data.logistics_line);
	$("#logistics_price").val(data.logistics_price);
	$("#logistics_phone").val(data.logistics_phone);
	$("#logistics_city_start").text(data.logistics_city_start);
	$("#logistics_city_stop").text(data.logistics_city_stop);
	$("#logistics_describe").val(data.logistics_describe);
	var logistics_imgs = strToJson(data.logistics_img);

	if(!isUndefinedAndEmpty(logistics_imgs)) {
		for(var k in logistics_imgs) {
			$("#setImg" + k).attr("src", path_url_img + logistics_imgs[k]);
		}
	}
	if(!isUndefinedAndEmpty(data.logistics_service)) {
		var services = new Array();
		services = data.logistics_service.split(",");
		//for(var k in services) {
		if(data.logistics_service.indexOf("上门提货") != -1) {
			$("#shop_service_1").addClass("service_button_bkg");
		}
		if(data.logistics_service.indexOf("代打木架") != -1) {
			$("#shop_service_2").addClass("service_button_bkg");
		}
		if(data.logistics_service.indexOf("破损包赔") != -1) {
			$("#shop_service_3").addClass("service_button_bkg");
		}
		//else {
		//				$("#ls_other").val(services[k]);
		//			}

		//			if(services[k] == '上门提货') {
		//				$("#shop_service_1").addClass("service_button_bkg");
		//			} else if(services[k] == '代打木架') {
		//				$("#shop_service_2").addClass("service_button_bkg");
		//			} else if(services[k] == '破损包赔') {
		//				$("#shop_service_3").addClass("service_button_bkg");
		//			} else {
		//				$("#ls_other").val(services[k]);
		//			}
		//}
	}
	$("#logistics_logo").attr("src", path_url_img + data.logistics_logo);
}

function checkBoxBtn(elementId, inpId, className) {
	var obj = $("#" + elementId);
	var inpObj = $("#" + inpId);
	if(obj.hasClass(className)) {
		obj.removeClass(className)
		inpObj.prop("checked", false);
	} else {
		obj.addClass(className);
		inpObj.prop("checked", true);
	}
}

/**
 * 多选框 值拼接
 * @param {Object} name
 */
function getCheckBoxVal(name) {
	var checkVal = [];
	var a = document.getElementsByName(name);
	for(var i = 0; i < a.length; i++) {
		if(a[i].checked) {
			checkVal.push(a[i].value);
		}
	}
	return checkVal.join(",");
}

/**
 * 多图地址拼接
 * @param {Object} name 元素id
 */
function getSrcVal(name) {
	var element = $("#" + name);
	var srcVal = [];
	for(var i = 0; i < element.length; i++) {
		var eq = element.eq(i).attr("src");
		if(eq != "") {
			srcVal.push(imgUrlRep(eq));
		}
	}
	return srcVal.toString();
}

/**
 * 图片路径截取
 * @param {Object} urlStr 图片路径
 */
function imgUrlRep(urlStr) {
	if(!isUndefinedAndEmpty(urlStr)&&urlStr.indexOf("../")==-1) {
		return urlStr.substring(urlStr.indexOf('/Tile'), urlStr.length);
	}
}
/**
 * 多选勾选赋值
 * 
 */
function checkBoxBtn(elementId, inpId, className) {
	var obj = $("#" + elementId);
	var inpObj = $("#" + inpId);
	if(obj.hasClass(className)) {
		obj.removeClass(className)
		inpObj.prop("checked", false);
	} else {
		obj.addClass(className);
		inpObj.prop("checked", true);
	}
}

function setImg1(jsonObj) {
	$("#setImg1").attr("src", path_url_img + jsonObj.data)
}

function setImg2(jsonObj) {
	$("#setImg2").attr("src", path_url_img + jsonObj.data)
}

function setImg3(jsonObj) {
	$("#setImg3").attr("src", path_url_img + jsonObj.data)
}

function lLogo(jsonObj) {
	$("#logistics_logo").attr("src", path_url_img + jsonObj.data)
}

mui("body").on('tap', '#sure_logistics', function() {
	var logistics_name = $("#logistics_name").val();
	var logistics_line = $("#logistics_line").val();
	var logistics_price = $("#logistics_price").val();
	var logistics_city_start = $("#logistics_city_start").text();
	var logistics_city_stop = $("#logistics_city_stop").text();
	var logistics_img = getSrcVal("logistics_img img");
	var logistics_service = getCheckBoxVal("logistics_service");
	var ls_other = $("#ls_other").val();
	var logistics_logo = imgUrlRep($("#logistics_logo").attr("src"));
	var logistics_phone = $("#logistics_phone").val();
	var logistics_describe = $("#logistics_describe").val();
//	if(isUndefinedAndEmpty(logistics_name)) {
//		mui.toast('请输入名称！');
//		return;
//	} else
	if(isUndefinedAndEmpty(logistics_line)) {
		mui.toast('请输入专线名称！');
		return;
	} else if(isUndefinedAndEmpty(logistics_price) || !validateElement("double", logistics_price)) {
		mui.toast('请输入正确价格！');
		return;
	} else if(isUndefinedAndEmpty(logistics_phone) || !validateElement("mobile", logistics_phone)) {
		mui.toast('请输入有效的手机号码！');
		return;
	} else if(isUndefinedAndEmpty(logistics_city_start)) {
		mui.toast('请输入出发城市！');
		return;
	} else if(isUndefinedAndEmpty(logistics_city_stop)) {
		mui.toast('请输入到达城市！');
		return;
	} else if(isUndefinedAndEmpty(logistics_logo)) {
		mui.toast('请上传logo！');
		return;
	} else if(isUndefinedAndEmpty(logistics_describe)) {
		mui.toast('请输入物流描述！');
		return;
	}
	if(isUndefinedAndEmpty(logistics_id)) {
		var json = {
			"user_id": getUserLocalData().user_id,
			"logistics_name": logistics_name,
			"logistics_line": logistics_line,
			"logistics_price": logistics_price,
			"logistics_city_start": logistics_city_start,
			"logistics_city_stop": logistics_city_stop,
			"logistics_img": logistics_img,
			"logistics_service": logistics_service,
			"logistics_logo": logistics_logo,
			"logistics_describe": logistics_describe,
			"logistics_phone":logistics_phone,
			"ls_other": ls_other,
		}
		var jsonAjax = {
			"url": "app_userShop_addLogistics.do",
			"jsonData": json,
			"methodName": "addLogistics_back",
		}
		getAjaxData(jsonAjax);
	} else {
		var json = {
			"logistics_id": logistics_id,
			"user_id": getUserLocalData().user_id,
			"logistics_name": logistics_name,
			"logistics_line": logistics_line,
			"logistics_price": logistics_price,
			"logistics_city_start": logistics_city_start,
			"logistics_city_stop": logistics_city_stop,
			"logistics_img": logistics_img,
			"logistics_service": logistics_service,
			"logistics_describe": logistics_describe,
			"logistics_logo": logistics_logo,
			"logistics_phone": logistics_phone,
			"ls_other": ls_other,
		}
		var jsonAjax = {
			"url": "app_userShop_updateLogistics.do",
			"jsonData": json,
			"methodName": "addLogistics_back",
		}
		getAjaxData(jsonAjax);
	}

});

function addLogistics_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	if(jsonInfo.code == "success") {
		mui.toast("提交成功！")
		//关闭页面
		plus.webview.close();
		//获得父页面的webview 
		var order = plus.webview.currentWebview().opener();
		if(order) {
			//触发列表界面的自定义事件（refresh）,从而进行数据刷新
			order.evalJS("initData()");
		}
		mui.back();
	} else {
		mui.toast(jsonInfo.info)
	}
}

mui("#showCityPicker3").on('tap', '#logistics_city_start', function() {
	var picker = new mui.PopPicker({
		layer: 2
	});
	picker.setData(cityData);
	picker.show(function(items) {
		$('#logistics_city_start').text(items[1].text);
	})
})
mui("#showCityPicker4").on('tap', '#logistics_city_stop', function() {
	var picker = new mui.PopPicker({
		layer: 2
	});
	picker.setData(cityData);
	picker.show(function(items) {
		$('#logistics_city_stop').text(items[1].text);
	})
})