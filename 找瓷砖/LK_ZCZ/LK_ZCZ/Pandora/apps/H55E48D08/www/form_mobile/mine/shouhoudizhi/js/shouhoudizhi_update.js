var addressID;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var address_id=self.address_id;
	if(!isUndefinedAndEmpty(address_id)){
		addressID=address_id;
		getAddressById(address_id);
	}
});
function getAddressById(address_id){
	var json = {
		"address_id": address_id,
		"user_id":getUserLocalData().user_id,
	};
	var jsonAjax = {
		"url": "app_getAllAddress.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getAddressById_back",
	};
	getAjaxData(jsonAjax);
}
function getAddressById_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	$.each(data, function(e, obj) {
		$("#addressArea").val(obj.address_area);
		$("#addressDetail").val(obj.address_detail);
		$("#addressPerson").val(obj.address_person);
		$("#addressPhone").val(obj.address_phone);
	});
}
function addAddress(){
	var address_area = $("#addressArea").val();
	if(isUndefinedAndEmpty(address_area)){
		mui.toast("请选择地区！")
		return;
	}
	var address_detail = $("#addressDetail").val();
	if(isUndefinedAndEmpty(address_detail)){
		mui.toast("请填写详细地址！")
		return;
	}
	var address_person = $("#addressPerson").val();
	if(isUndefinedAndEmpty(address_person)){
		mui.toast("请填写收货人姓名！")
		return;
	}
	var address_phone = $("#addressPhone").val();
	if(isUndefinedAndEmpty(address_phone)){
		mui.toast("请填写收货电话！")
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(address_phone))){ 
        mui.toast("请输入正确的手机号码！");  
        return; 
    }
	if(isUndefinedAndEmpty(addressID)){
		var json = {
			"address_area": address_area,
			"address_detail": address_detail,
			"address_person": address_person,
			"address_phone": address_phone,
			"user_id":getUserLocalData().user_id,
		};
		var jsonAjax = {
			"url": "app_addAddress.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "addAddress_back",
		};
		getAjaxData(jsonAjax);
	}else{
		var json = {
			"address_id":addressID,
			"address_area": address_area,
			"address_detail": address_detail,
			"address_person": address_person,
			"address_phone": address_phone,
			"user_id":getUserLocalData().user_id,
		};
		var jsonAjax = {
			"url": "app_updateAddress.do",
			"jsonData": json,
			"methodName": "updateOver_back",
			"overMethodName": "addAddress_back",
		};
		getAjaxData(jsonAjax);
	}
}
function addAddress_back(jsonObj){
	addressID='';
	var page = plus.webview.getWebviewById("shouhoudizhi");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: 'shouhoudizhi.html',
		id: 'shouhoudizhi',
	});
}

/**
 * 判断是否电话号码
 * @param {Object} str
 */
 function chatThePhoneNum(str){
	  var reg=new RegExp(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})/);
	  if(reg.test(str)){
	    return true;
	  }else{
	   return false;
	  }
 }