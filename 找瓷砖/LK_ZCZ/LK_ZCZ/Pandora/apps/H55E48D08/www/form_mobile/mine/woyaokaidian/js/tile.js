var product_id = '';
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	product_id = self.product_id;
	if(!isUndefinedAndEmpty(product_id)) {
		getProductById(product_id);
	}
});

/**
 * 获取商品信息
 * @param {Object} id
 */
function getProductById(id) {
	var json = {
		"product_id": id,
	}
	var jsonAjax = {
		"url": "app_Shop_getProductById.do",
		"jsonData": json,
		"methodName": "getProductById_back",
	}
	getAjaxData(jsonAjax);
}
/**
 * 返回商品信息
 */
function getProductById_back(jsonObj) {
	var json = strToJson(jsonObj.data);
	var data = strToJson(json.data);
	$("#product_name").val(data.product_name);
	$("#product_logo").attr("src", path_url_img + data.product_logo);
	//	$("#product_price").val(data.product_price);
	$("#product_inventory").val(data.product_inventory);
	$("#product_attribute_val").val(data.product_attribute_val);
	$("#sku_name").val(data.sku_name);
	var product_img = strToJson(data.product_img);
	if(!isUndefinedAndEmpty(product_img)) {
		for(var k in product_img) {
			$("#obbtn" + k).attr("src", path_url_img + product_img[k]);
		}
	}
	var product_detail = strToJson(data.product_detail);
	if(!isUndefinedAndEmpty(product_detail)) {
		for(var k in product_detail) {
			$("#infobtn" + k).attr("src", path_url_img + product_detail[k]);
		}
	}
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
	if(!isUndefinedAndEmpty(urlStr) && urlStr.indexOf("../") == -1) {
		return urlStr.substring(urlStr.indexOf('/Tile'), urlStr.length);
	}
}
/**
 * logo
 */
mui(".item_logo").on('tap', '.logo_img', function() {
	imgInit("setImg")
})

function setImg(jsonObj) {
	$("#product_logo").attr("src", path_url_img + jsonObj.data);
}

function ob_btn1(jsonObj) {
	$("#obbtn1").attr("src", path_url_img + jsonObj.data);
}

function ob_btn2(jsonObj) {
	$("#obbtn2").attr("src", path_url_img + jsonObj.data);
}

function ob_btn3(jsonObj) {
	$("#obbtn3").attr("src", path_url_img + jsonObj.data);
}

function ob_btn4(jsonObj) {
	$("#obbtn4").attr("src", path_url_img + jsonObj.data);
}

function ob_btn5(jsonObj) {
	$("#obbtn5").attr("src", path_url_img + jsonObj.data);
}

function info_btn1(jsonObj) {
	$("#infobtn1").attr("src", path_url_img + jsonObj.data);
}

function info_btn2(jsonObj) {
	$("#infobtn2").attr("src", path_url_img + jsonObj.data);
}

function info_btn3(jsonObj) {
	$("#infobtn3").attr("src", path_url_img + jsonObj.data);
}

function info_btn4(jsonObj) {
	$("#infobtn4").attr("src", path_url_img + jsonObj.data);
}

function info_btn5(jsonObj) {
	$("#infobtn5").attr("src", path_url_img + jsonObj.data);
}

function savePro(type) {
	var product_name = $("#product_name").val();
	//	var product_price=$("#product_price").val();
	var product_inventory = $("#product_inventory").val();
	var product_attribute_val = $("#product_attribute_val").val();
	var sku_name = $("#sku_name").val();
	var user_id = getUserLocalData().user_id;
	var product_logo = imgUrlRep($('#product_logo').attr('src'));
	var product_detail = getSrcVal("commodityOb img");
	var product_descrip = $("#descrip").val();
	var product_img = getSrcVal("commodityInfo img");
	if(isUndefinedAndEmpty(product_name)) {
		mui.toast('请输入产品名称！');
		return;
		//	}  else if(isUndefinedAndEmpty(product_price)) {
		//		mui.toast('请输入产品价格！');
		//		return;
	} else if(isUndefinedAndEmpty(product_inventory)) {
		mui.toast('请输入产品库存！');
		return;
	} else if(isUndefinedAndEmpty(product_attribute_val)) {
		mui.toast('请填写产品属性！');
		return;
	} else if(isUndefinedAndEmpty(sku_name)) {
		mui.toast('请填写产品规格！');
		return;
	} else if(isUndefinedAndEmpty(product_logo)) {
		mui.toast('请上传缩略图！');
		return;
	} else if(isUndefinedAndEmpty(product_descrip)) {
		mui.toast('请填写产品描述！');
		return;
	}
	$(".saveBtn").attr("disabled", true);
	if(isUndefinedAndEmpty(product_id)) {
		var json = {
			'user_id': user_id,
			//			'product_price': product_price,
			'product_inventory': product_inventory,
			'product_attribute_val': product_attribute_val,
			'sku_name': sku_name,
			'product_name': product_name,
			'product_logo': product_logo,
			'product_detail': product_detail,
			'product_img': product_img,
			"product_descrip": product_descrip
		}
		var jsonAjax = {
			"url": "app_shop_addTile.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "addTile_back",
			"type": type,
		}
		getAjaxData(jsonAjax);
	} else {
		var json = {
			'product_id': product_id,
			'user_id': user_id,
			//			'product_price': product_price,
			'product_inventory': product_inventory,
			'product_attribute_val': product_attribute_val,
			'sku_name': sku_name,
			'product_name': product_name,
			'product_logo': product_logo,
			'product_detail': product_detail,
			'product_img': product_img,
			"product_descrip": product_descrip
		}
		var jsonAjax = {
			"url": "app_shop_updateTile.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "updateTile_back",
			"type": type,
		}
		getAjaxData(jsonAjax);
	}
}

function addTile_back(jsonObj) {
	$(".saveBtn").attr("disabled", false);
	var jsonInfo = strToJson(jsonObj.data);
	mui.toast("添加成功！");
	if(jsonObj.type == "0") {
		closeme();
	} else {
		window.location.reload();
	}
}

function updateTile_back(jsonObj) {
	$(".saveBtn").attr("disabled", false);
	var jsonInfo = strToJson(jsonObj.data);
	if(jsonInfo.code == "success") {
		mui.toast("修改成功！");
		if(jsonObj.type == "0") {
			closeme();
		} else {
			window.location.reload();
		}
	} else {
		mui.toast(jsonInfo.info)
	}
}
window.addEventListener('setAttributeVal', function(event) {
	var jsonObj = event.detail;
	$("#product_attribute_val").val(jsonObj.product_attribute_val);
});
window.addEventListener('setSkuVal', function(event) {
	var jsonObj = event.detail;
	$("#sku_name").val(jsonObj.sku_name);
});

//function getBrand_back(jsonObj) {
//	var json = strToJson(jsonObj.data);
//	brand_data = strRep(json.data, "brand_id", "brand_name");
//}
/**
 * 品牌列表
 */
//var brand_data = ""
//mui(".content").on('tap', '#commodity_brand', function() {
//	var picker1 = new mui.PopPicker();
//	picker1.setData(strToJson(brand_data));
//	picker1.show(function(items) {
//		$('#commodityBrand').val(items[0].text);
//		$('#commodity_id').val(items[0].value);
//		getAttribute(items[0].value)
//	})
//})
/*
 * 提货地址 触发事件
 */
//mui(".content").on('tap', '#tihuoAdd', function() {
//	getCityByBaiDuMap();
//	var getid = $(this).find('input').attr('id')
//	var picker = new mui.PopPicker({
//		layer: 2
//	});
//	picker.setData(cityData);
//	picker.show(function(items) {
//		$('#' + getid).val(items[0].text);
//	})
//})
//$('#tihuoAdd').click(function() {
//	getCityByBaiDuMap();
//	var getid = $(this).find('input').attr('id')
//	var picker = new mui.PopPicker({
//		layer: 2
//	});
//	picker.setData(cityData);
//	picker.show(function(items) {
//		$('#' + getid).val(items[0].text);
//	})
//})
/**
 * 获取属性值
 * @param {Object} id
 * @param {Object} id_s
 */
//function getAttributeInfo(id, id_s) {
//	var json = {
//		"attribute_id": id,
//	}
//	var jsonAjax = {
//		"url": "app_shop_getAttribute_val.do",
//		"jsonData": json,
//		"methodName": "getAttributeInfo_back",
//		"id_s": id_s
//	}
//	getAjaxData(jsonAjax);
//
//}
//
//function getAttributeInfo_back(jsonObj) {
//	var json = strToJson(jsonObj.data);
//	var set_Data = strRep(json.data, "val_id", "attribute_val");
//	document.getElementById(jsonObj.id_s).innerHTML = set_Data;
//}
/**
 * 将数据转换成 mui picker能解析的格式 :[{value:""},{text:""}]
 * @param {Object} data 数据
 * @param {Object} id 数据中需要替换成 value 的字样
 * @param {Object} val 数据中需要转换成 text 的字样
 */
//function strRep(str, id, val) {
//	var value = "/" + id + "/ig";
//	var text = "/" + val + "/ig";
//	var reStr = (str.replace(eval(value), "value").replace(eval(text), "text"));
//	return reStr;
//}

/*
 * 属性值列表 
 */
//function setPriker(e) {
//	var data = $(e).find('div').text();
//	var picker = new mui.PopPicker();
//	picker.setData(strToJson(data));
//	picker.show(function(items) {
//		$(e).find('#_val').val(items[0].text);
//	})
//}
/**
 * 加载属性列表
 */
//function getAttribute() {
//	var jsonAjax = {
//		"url": "app_shop_getAttribute.do",
//		"methodName": "getAttribute_back",
//	}
//	getAjaxData(jsonAjax);
//}
//
//function getAttribute_back(jsonObj) {
//	var json = strToJson(jsonObj.data);
//	var data = strToJson(json.data);
//	var attributeHtml = "";
//	$(data).each(function(e, obj) {
//		var id_s = obj.attribute_id + "val";
//		//getAttributeInfo(obj.attribute_id, id_s);
//		attributeHtml += '<li class="mui-table-view-cell" id="' + obj.attribute_id + '" onclick=getAttributeVal("' + obj.attribute_id + '")>';
//		attributeHtml += '<a class="mui-navigate-right">' + obj.attribute_name + '</a>';
//		attributeHtml += '<input type="text" placeholder="请选择" readonly />';
//		//attributeHtml += '<div type="text" ` style="display:none;"></div>';
//		attributeHtml += '</li>';
//	});
//	$('#_attribute').html(attributeHtml);