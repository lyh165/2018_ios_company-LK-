var recruit_id = '';

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	recruit_id = self.recruit_id;
	if(!isUndefinedAndEmpty(recruit_id)) {
		getRecruitById(recruit_id);
	}
});

function getRecruitById(recruit_id) {
	var json = {
		"recruit_id": recruit_id,
	}
	var jsonAjax = {
		"url": "app_shop_getRecruitById.do",
		"jsonData": json,
		"methodName": "getLogisticsById_back",
	}
	getAjaxData(jsonAjax);
}

function getLogisticsById_back(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	$("#other_recruit_name").val(data.recruit_name);
	$("#other_recruit_treatment").val(data.recruit_treatment);
	$("#recruit_requirement").val(data.recruit_requirement);
	$("#recruit_mailbox").val(data.recruit_mailbox);
	$("#recruit_person").val(data.recruit_person);
	$("#recruit_phone").val(data.recruit_phone);
	$("#recruit_logo").attr("src", path_url_img + data.recruit_logo);
}
mui("body").on('tap', '.saveBtn', function() {
	var recruit_name = '';
	
	
	for(var i = 0;i<$("#recruit_name .button_01").length;i++){
		if(i == 0 ){
			recruit_name = $("#recruit_name .button_01").eq(i).html();
		}else{
			recruit_name = recruit_name + ',' + $("#recruit_name .button_01").eq(i).html();
		}
	}
	
	console.log(recruit_name);
	
	if(isUndefinedAndEmpty(recruit_name)){
		recruit_name = $("#other_recruit_name").val();
	}
	var recruit_treatment = $("#recruit_treatment .button_01").html();
	if (isUndefinedAndEmpty(recruit_treatment)) {
		recruit_treatment = $("#other_recruit_treatment").val();
	}
	var recruit_requirement = $("#recruit_requirement").val();
	var recruit_mailbox = $("#recruit_mailbox").val();
	var recruit_person = $("#recruit_person").val();
	var recruit_phone = $("#recruit_phone").val();
	var recruit_logo = imgUrlRep($("#recruit_logo").attr("src"));
	var imgList = getSrcVal('imgUl img');

	if(isUndefinedAndEmpty(recruit_name)) {
		mui.toast('请选择招聘岗位！');
		return;
	} else if(isUndefinedAndEmpty(recruit_treatment)) {
		mui.toast('请选择岗位待遇！');
		return;
	} else if(isUndefinedAndEmpty(recruit_mailbox) || !validateElement("email", recruit_mailbox)) {
		mui.toast('请填写正确的邮箱！');
		return;
	} else if(isUndefinedAndEmpty(recruit_person)) {
		mui.toast('请填写联系人！');
		return;
	} else if(isUndefinedAndEmpty(recruit_phone) || !validateElement("mobile", recruit_phone)) {
		mui.toast('请填写联系电话！');
		return;
	} else if(isUndefinedAndEmpty(recruit_logo)) {
		mui.toast('请上传公司Logo！');
		return;
	} else if(isUndefinedAndEmpty(imgList)) {
		mui.toast('请上传公司工作环境！');
		return;
	}
	if(isUndefinedAndEmpty(recruit_id)) {
		var json = {
			"user_id": getUserLocalData().user_id,
			"recruit_name": recruit_name,
			"recruit_treatment": recruit_treatment,
			"recruit_requirement": recruit_requirement,
			"recruit_mailbox": recruit_mailbox,
			"recruit_person": recruit_person,
			"recruit_phone": recruit_phone,
			"recruit_logo": recruit_logo,
			"recruit_img":imgList
		}
		var jsonAjax = {
			"url": "app_shop_addRecruit.do",
			"jsonData": json,
			"methodName": "addRecruit_back",
		}
		getAjaxData(jsonAjax);
	}else{
		var json = {
			"recruit_id":recruit_id,
			"user_id": getUserLocalData().user_id,
			"recruit_name": recruit_name,
			"recruit_treatment": recruit_treatment,
			"recruit_requirement": recruit_requirement,
			"recruit_mailbox": recruit_mailbox,
			"recruit_person": recruit_person,
			"recruit_phone": recruit_phone,
			"recruit_logo": recruit_logo,
			"recruit_img":imgList
		}
		var jsonAjax = {
			"url": "app_shop_updateRecruit.do",
			"jsonData": json,
			"methodName": "addRecruit_back",
		}
		getAjaxData(jsonAjax);
	}

})

function addRecruit_back(jsonObj) {
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

function imgUrlRep(urlStr) {
	if(!isUndefinedAndEmpty(urlStr)&&urlStr.indexOf("../")==-1) {
		return urlStr.substring(urlStr.indexOf('/Tile'), urlStr.length);
	}
}

function setImg(jsonObj) {
	$("#recruit_logo").attr("src", path_url_img + jsonObj.data);
}
function recruitImg1(jsonObj) {
	$("#recruitImg1").attr("src", path_url_img + jsonObj.data);
}

function recruitImg2(jsonObj) {
	$("#recruitImg2").attr("src", path_url_img + jsonObj.data);
}

function recruitImg3(jsonObj) {
	$("#recruitImg3").attr("src", path_url_img + jsonObj.data);
}

function recruitImg4(jsonObj) {
	$("#recruitImg4").attr("src", path_url_img + jsonObj.data);
}

function recruitImg5(jsonObj) {
	$("#recruitImg5").attr("src", path_url_img + jsonObj.data);
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