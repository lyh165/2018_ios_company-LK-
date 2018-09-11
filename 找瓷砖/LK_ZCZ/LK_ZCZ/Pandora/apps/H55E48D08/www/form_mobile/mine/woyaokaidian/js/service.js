var service_id = '';

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	service_id = self.service_id;
	if(!isUndefinedAndEmpty(service_id)) {
		getServiceById(service_id);
	}
});

function getServiceById(service_id) {
	var json = {
		"service_id": service_id,
	}
	var jsonAjax = {
		"url": "app_shop_getServiceById.do",
		"jsonData": json,
		"methodName": "getServiceById_back",
	}
	getAjaxData(jsonAjax);
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


function getServiceById_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	$("#service_name").val(data.service_name);
	$("#service_money").val(data.service_money);
	$("#service_unit").val(data.service_unit);
	$("#service_describe").val(data.service_describe);
	var service_imgs = strToJson(data.service_img);

	if(!isUndefinedAndEmpty(service_imgs)) {
		for(var k in service_imgs) {
			$("#setImg" + k).attr("src", path_url_img + service_imgs[k]);
		}
	}
	//$("#service_img").attr("src", path_url_img + data.service_img);
	$("#service_phone").val(data.service_phone);
	$("#service_logo").attr("src", path_url_img + data.service_logo);
}



jQuery('.fb').on('click',function(){
	var service_name = $("#service_name").val();
	var service_money = $("#service_money").val();
	var service_unit = $("#service_unit").val();
	var service_phone = $("#service_phone").val();
	var service_describe = $("#service_describe").val();
	var service_logo = imgUrlRep($("#service_logo").attr("src"));
	var service_imgs = getSrcVal("imgList img");
	if(isUndefinedAndEmpty(service_name)) {
		mui.toast('请填写服务名称！');
		return;
	} else if(isUndefinedAndEmpty(service_money) || !validateElement("double", service_money)) {
		mui.toast('请填写价格');
		return;
	} else if(isUndefinedAndEmpty(service_unit)) {
		mui.toast('请填写计价单位！');
		return;
	} else if(isUndefinedAndEmpty(service_phone) || !validateElement("mobile", service_phone)) {
		mui.toast('请填写联系电话！');
		return;
	} else if(isUndefinedAndEmpty(service_logo)) {
		mui.toast('请上传logo！');
		return;
	}else if(isUndefinedAndEmpty(service_imgs)) {
		mui.toast('请上传描述图片！');
		return;
	}else if(isUndefinedAndEmpty(service_describe)) {
		mui.toast('请填写描述！');
		return;
	}
	if(isUndefinedAndEmpty(service_id)) {
		var json = {
			"user_id": getUserLocalData().user_id,
			"service_name": service_name,
			"service_imgs": service_imgs,
			"service_money": service_money,
			"service_unit": service_unit,
			"service_phone": service_phone,
			"service_logo": service_logo,
			"service_describe":service_describe
		}
		var jsonAjax = {
			"url": "app_shop_addService.do",
			"jsonData": json,
			"methodName": "addService_back",
		}
		getAjaxData(jsonAjax);
	}else{
		var json = {
			"service_id":service_id,
			"user_id": getUserLocalData().user_id,
			"service_name": service_name,
			"service_imgs": service_imgs,
			"service_money": service_money,
			"service_unit": service_unit,
			"service_phone": service_phone,
			"service_logo": service_logo,
			"service_describe":service_describe
		}
		var jsonAjax = {
			"url": "app_shop_updateService.do",
			"jsonData": json,
			"methodName": "addService_back",
		}
		getAjaxData(jsonAjax);
	}
})

//mui("body").on('tap', '.saveBtn', function() {
//	var service_name = $("#service_name").val();
//	var s_img_src= $("#service_img").val();
//	var service_img = imgUrlRep(s_img_src);//"<img src='"+s_img_src+"'/>"
//	var service_money = $("#service_money").val();
//	var service_unit = $("#service_unit").val();
//	var service_phone = $("#service_phone").val();
//	var service_logo = imgUrlRep($("#service_logo").attr("src"));
//
//	if(isUndefinedAndEmpty(service_name)) {
//		mui.toast('请填写服务名称！');
//		return;
//	} else if(isUndefinedAndEmpty(service_money) || !validateElement("double", service_money)) {
//		mui.toast('请填写价格');
//		return;
//	} else if(isUndefinedAndEmpty(service_unit)) {
//		mui.toast('请填写计价单位！');
//		return;
//	} else if(isUndefinedAndEmpty(service_phone) || !validateElement("mobile", service_phone)) {
//		mui.toast('请填写联系电话！');
//		return;
//	} else if(isUndefinedAndEmpty(service_logo)) {
//		mui.toast('请上传logo！');
//		return;
//	}
//	if(isUndefinedAndEmpty(service_id)) {
//		var json = {
//			"user_id": getUserLocalData().user_id,
//			"service_name": service_name,
//			"service_img": service_img,
//			"service_money": service_money,
//			"service_unit": service_unit,
//			"service_phone": service_phone,
//			"service_logo": service_logo,
//		}
//		var jsonAjax = {
//			"url": "app_shop_addService.do",
//			"jsonData": json,
//			"methodName": "addService_back",
//		}
//		getAjaxData(jsonAjax);
//	}else{
//		var json = {
//			"service_id":service_id,
//			"user_id": getUserLocalData().user_id,
//			"service_name": service_name,
//			"service_img": service_img,
//			"service_money": service_money,
//			"service_unit": service_unit,
//			"service_phone": service_phone,
//			"service_logo": service_logo,
//		}
//		var jsonAjax = {
//			"url": "app_shop_updateService.do",
//			"jsonData": json,
//			"methodName": "addService_back",
//		}
//		getAjaxData(jsonAjax);
//	}
//})

function addService_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	if(jsonInfo.code == "success") {
		mui.toast("发布成功！！！");
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

/**
 * 图片地址截取
 * @param {Object} urlStr
 */
function imgUrlRep(urlStr) {
	if(!isUndefinedAndEmpty(urlStr)&&urlStr.indexOf("../")==-1) {
		return urlStr.substring(urlStr.indexOf('/Tile'), urlStr.length);
	}
}

function setImg(jsonObj) {
	$("#service_logo").attr("src", path_url_img + jsonObj.data);
}

//var apage = null;
function goBtn() {
	var serviceImg = $("#service_img").val();
	mui.openWindow({
		url: "fuwumiaoshu.html",
		id: "fuwumiaoshu",
		extras: {
			service_img : serviceImg
		},
	})
}
window.addEventListener('doit', function(e) {
	var imageHtml = e.detail.imagePath;
	$("#service_img").val(imageHtml);
});

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