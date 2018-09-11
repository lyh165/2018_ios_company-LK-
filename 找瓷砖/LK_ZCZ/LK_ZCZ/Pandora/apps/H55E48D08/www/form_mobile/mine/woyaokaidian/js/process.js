var process_id = '';
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	process_id = self.process_id;
	if(!isUndefinedAndEmpty(process_id)) {
		getProcessById(process_id);
	}
});

function getProcessById(process_id) {
	var json = {
		"process_id": process_id,
	}
	var jsonAjax = {
		"url": "app_shop_getProcessById.do",
		"jsonData": json,
		
		"methodName": "getProcessById_back",
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

function getProcessById_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	$("#process_name").val(data.process_name);
	$("#process_money").val(data.process_money);
	$("#process_unit").val(data.process_unit);
	$("#process_phone").val(data.process_phone);    
	$("#process_describe").val(data.process_describe);
	$("#process_logo").attr("src", path_url_img + data.process_logo);
	var process_imgs = strToJson(data.process_img);

	if(!isUndefinedAndEmpty(process_imgs)) {
		for(var k in process_imgs) {
			$("#setImg" + k).attr("src", path_url_img + process_imgs[k]);
		}
	}
}


jQuery('.fb').eq(0).on('tap',function(){
	var process_name = $("#process_name").val();
	var process_money = $("#process_money").val();
	var process_unit = $("#process_unit").val();
	var process_phone = $("#process_phone").val();
	var process_describe = $("#process_describe").val();
	var process_logo = imgUrlRep($("#process_logo").attr("src"));
	var process_imgs = getSrcVal("imgList img");
	if(isUndefinedAndEmpty(process_name)) {
		mui.toast('请填写工厂名称！');
		return;
	} else if(isUndefinedAndEmpty(process_money) || !validateElement("double", process_money)) {
		mui.toast('请填写价格');
		return;
	} else if(isUndefinedAndEmpty(process_unit)) {
		mui.toast('请填写计价单位！');
		return;
	} else if(isUndefinedAndEmpty(process_phone) || !validateElement("mobile", process_phone)) {
		mui.toast('请填写联系电话！');
		return;
	} else if(isUndefinedAndEmpty(process_logo)) {
		mui.toast('请上传logo！');
		return;
	} else if(isUndefinedAndEmpty(process_imgs)) {
		mui.toast('请上传描述图片！');
		return;
	} else if(isUndefinedAndEmpty(process_describe)) {
		mui.toast('请输入描述！');
		return;
	}
	if(isUndefinedAndEmpty(process_id)) {
		var json = {
			"user_id": getUserLocalData().user_id,
			"process_name": process_name,
			"process_money": process_money,
			"process_unit": process_unit,
			"process_phone": process_phone,
			"process_logo": process_logo,
			"process_imgs":process_imgs,
			"process_describe":process_describe,
		}
		var jsonAjax = {
			"url": "app_shop_addProcess.do",
			"jsonData": json,
			"methodName": "addProcess_back",
		}
		getAjaxData(jsonAjax);
	}else{
		var json = {
			"process_id":process_id,
			"user_id": getUserLocalData().user_id,
			"process_name": process_name,
			"process_money": process_money,
			"process_unit": process_unit,
			"process_phone": process_phone,
			"process_logo": process_logo,
			"process_imgs":process_imgs,
			"process_describe":process_describe,
		}
		var jsonAjax = {
			"url": "app_shop_updateProcess.do",
			"jsonData": json,
			"methodName": "addProcess_back",
		}
		getAjaxData(jsonAjax);
	}

})


function addProcess_back(jsonObj) {
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
	$("#process_logo").attr("src", path_url_img + jsonObj.data);
}

function goBtn() {
	var processImg = $("#process_img").val();
	mui.openWindow({
		url: "processInf.html",
		id: "processInf",
		extras: {
			process_img : processImg
		},
	})
}
window.addEventListener('doit', function(e) {
	var imagePath = e.detail.imagePath;
	$("#process_img").val(imagePath);
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


