mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	getThisGroupDetali(self.groupId);

});

function getThisGroupDetali(groupId){
	var group_id = groupId;
	var json = {
		"group_id":group_id
	};
		var jsonAjax = {
		"url" : "app_getGroupById.do",
		"jsonData" : json,
		"methodName" : "getThisGroupDetali_back",
	};
	getAjaxData(jsonAjax);
}

function getThisGroupDetali_back(jsonObj){
	var json=strToJson(jsonObj.data);
	var data=strToJson(json.data);
	$("#groupId").val(data.group_id);
	$("#proImg").attr("src",data.product_logo);
	$("#proName").html(data.product_name);
	$("#proSkuName").html(data.orderdetail_val);
	$("#skuPrice").html(data.sku_money);
	$("#addressPerson").html(data.address_person);
	$("#addressPhone").html(data.address_phone);
	$("#addressDetail").html(data.address_detail);
	$("#groupNum").val(data.group_num);
	$("#groupMyUser").val(data.group_my_user);
	$("#groupPrice").val(data.group_price);
	$("#result").html(data.group_strat_time);
	$("#start").html(data.group_stop_time);
	$("#userGroupBz").text(data.bz);
}

/**
 * 选择收货地址
 */
function changAddress(){
	var userId = getUserLocalData().user_id;
	mui.openWindow({
		url:"groupAddressTwo.html",
		id:"changeAddress",
		extras:{
			"userId":userId
		},
		waiting:{
			autoShow:false
		}
	});
}
window.addEventListener('setAddressID',function(event){
	var jsonObj=event.detail;
	setAddressContent(jsonObj);
});
function setAddressContent(jsonObj){
	$("#addressPerson").html(jsonObj.address_person);
	$("#addressPhone").html(jsonObj.address_phone);
	$("#addressDetail").html(jsonObj.address_detail);
	//$("#addressPerson").html(jsonObj.address_person);
}


function updateGroup(){
	var group_id = $("#groupId").val();
	var group_num = $("#groupNum").val();
	var group_my_user = $("#groupMyUser").val();
	var group_price=$("#groupPrice").val();
	var group_strat_time=$("#result").text();
	var group_stop_time=$("#start").text();
	var address_detail=$("#addressDetail").text();
	var address_person=$("#addressPerson").text();
	var address_phone=$("#addressPhone").text();
	var bz=$("#userGroupBz").val();
	
	if(isUndefinedAndEmpty(group_num)){
		mui.toast('请输入团购数量');
		return ;
	}
	if(!numberTest(group_num)){
		mui.toast('团购数量请输入数字');
		return;
	}
	if(!numberTest(group_my_user)){
		mui.toast('我团购数量请输入数字');
		return;
	}
	if(!numberTest(group_price)){
		mui.toast('团购价格请输入数字');
		return;
	}
	if(isUndefinedAndEmpty(group_strat_time)){
		mui.toast('请选择开始时间');
		return ;
	}
	if(isUndefinedAndEmpty(group_stop_time)){
		mui.toast('请选择结束时间');
		return ;
	}
	if(isUndefinedAndEmpty(address_detail)){
		mui.toast('请选择收货地址');
		return ;
	}
	if(isUndefinedAndEmpty(address_person)){
		mui.toast('请输入收货人');
		return ;
	}
	if(isUndefinedAndEmpty(address_phone)){
		mui.toast('请输入收货人电话');
		return ;
	}
	if(isUndefinedAndEmpty(bz)){
		mui.toast('请介绍一下团购');
		return ;
	}
	
	var json = {
		"group_id":group_id,
		"group_num":group_num,
		"group_my_user":group_my_user,
		"group_price":group_price,
		"group_strat_time":group_strat_time,
		"group_stop_time":group_stop_time,
		"address_detail":address_detail,
		"address_person":address_person,
		"address_phone":address_phone,
		"bz":bz
	};
	
	var jsonAjax = {
		"url" : "app_updateGroup.do",
		"jsonData" : json,
		"methodName" : "backToMyThing",
	};
	getAjaxData(jsonAjax);
}
function backToMyThing(){
	//获得父页面的webview 
		var order = plus.webview.currentWebview().opener();
		if(order) {
			//触发列表界面的自定义事件（refresh）,从而进行数据刷新
			order.evalJS("initData()");
		}
	mui.openWindow({
		url:"../wodefabu/wodefabu_wuliu.html",
		id:"changeAddress",
		extras:{
			
		},
		waiting:{
			autoShow:false
		}
	});
}


function numberTest(str){
	  var reg=new RegExp(/^\d+$/);
	  if(reg.test(str)){
	    return true;
	  }else{
	   return false;
	  }
 }