$(function() {
	getProAttribute();
})

function getProAttribute() {
	var jsonAjax = {
		"url": "app_getProAttribute.do",
		"methodName": "updateOver_back",
		"overMethodName": "getProAttribute_back",
	}
	getAjaxData(jsonAjax);
}

function getProAttribute_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	var content = "";
	$.each(data, function(e, obj) {
		var attribute_id = obj.attribute_id;
		content += '<li class="mui-table-view-cell"><a id="name_' + attribute_id + '">' + obj.attribute_name + '</a>';
		content += '<input type="text" id="input_' + attribute_id + '" placeholder="填写名称" />';
		content += '<button type="button" class="mui-btn mui-btn-danger r54" onclick=addAttribute("' + attribute_id + '")>添加</button>';
		content += '<span class="mui-btn mui-btn-success" onclick=chooseAttribute("' + attribute_id + '")>选择</span>';
		content += '<li class="mui-table-view-cell val_input" id="li_' + attribute_id + '" isSearch="' + obj.is_search + '"></li>';
	});
	$("#attribute_list").html(content);
}

function addAttribute(attribute_id) {
	if(isUndefinedAndEmpty($("#input_" + attribute_id).val())) {
		return;
	}
	var val = $("#input_" + attribute_id).val() + ",";
	var content = '<span>' + val + '</span>';
	$("#li_" + attribute_id).append(content);
	$("#input_" + attribute_id).val("");
}

function chooseAttribute(attribute_id) {
	mui.openWindow({
		url: "chooseVal.html",
		id: 'chooseVal',
	});
	var page = plus.webview.getWebviewById("chooseVal");
	if(page) {
		page.evalJS("initData('" + attribute_id + "')");
	}
}
window.addEventListener('setAttributeVal', function(event) {
	var jsonObj = event.detail;
	var content = '<span>' + jsonObj.attribute_val + ',</span>';
	$("#li_" + jsonObj.attribute_id).append(content);
});
/**
 * 确定
 */
function sure() {
	var flan = false;
	var product_attribute_val = '';
	$(".val_input").each(function() {
		//获取属性名
		var li_id = $(this).attr("id");
		var id = li_id.substring(3, li_id.length);
		//属性名
		var attribute_name = $("#name_" + id).text();
		//属性值
		var val = $(this).text();
		val = val.substring(0, val.length - 1);
		//是否必填
		var isSearch = $(this).attr("isSearch");
		if(isSearch == "1" && isUndefinedAndEmpty(val)) {
			mui.toast(attribute_name + "必填！");
			flan = true;
		}
		if(!isUndefinedAndEmpty(val)) {
			product_attribute_val += attribute_name + ':' + val + ';';
		}
	});
	//必填数据没填
	if(flan) {
		return;
	}
	product_attribute_val=product_attribute_val.substring(0, product_attribute_val.length-1);
	var json = {
		"product_attribute_val": product_attribute_val,
	}
	//将参数传回上一个页面"json"
	var mainPage = plus.webview.currentWebview().opener(); //拿到父页面对象
	mui.fire(mainPage, "setAttributeVal", json); //fire通讯
	plus.webview.currentWebview().hide();
}