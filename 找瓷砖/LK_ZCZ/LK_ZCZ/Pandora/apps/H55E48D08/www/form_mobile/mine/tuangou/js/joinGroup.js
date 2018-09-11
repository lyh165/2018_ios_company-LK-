var groupId='';
mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	var groupId=self.groupId;
	getGroupContent(groupId);
	addGroupDefaultAddress();
	$("#group_id").val(self.groupId);
});

function numberTest(str){
	  var reg=new RegExp(/^\d+$/);
	  if(reg.test(str)){
	    return true;
	  }else{
	   return false;
	  }
 }

function addGroupDefaultAddress(){
	var userId = getUserLocalData().user_id;
	var json={
		"user_id":userId
	}
	var jsonAjax={
		"url":"app_addGroup_default_address.do",
		"jsonData":json,
		"methodName":"addGroupDefaultAddress_back"
	}
	getAjaxData(jsonAjax);
	
}
function addGroupDefaultAddress_back(jsonObj){
	var json=strToJson(jsonObj.data);
	var obj=strToJson(json.data);
	var content='';
	if (!isUndefinedAndEmpty(obj.data)) {
		content+='<span class="content-text">你还没有设置收货地址,点击去添加</span>';
		$("#defaultAddress").html(content);
	}else{
		$("#addressPerson").html(obj.address_person);
		$("#addressPhone").html(obj.address_phone);
		$("#addressDetail").html(obj.address_detail);
	}
	
}	

function getGroupContent(id){
	var json={
		"group_id":id
	}
	var jsonAjax={
		"url":"app_getGroupDetail.do",
		"jsonData":json,
		"methodName":"getGroupContent_back"
	}
	getAjaxData(jsonAjax);
}
function getGroupContent_back(jsonObj){
	var json=strToJson(jsonObj.data);
	var obj=strToJson(json.data);
	$("#groupId").val(obj.group_id);
	$("#productImg").attr("src",path_url_img+obj.product_logo); 
	$("#productName").html(obj.product_name);
	$("#skuName").html(obj.orderdetail_val);
	$("#skuMoney").html('￥'+obj.sku_money);
	$("#lessNum").html(obj.sun);
	$("#groupPrice").html(obj.group_price);
	$('#logNum').attr('placeholder','最多团购：'+obj.sun);  
}

function joinGroup(){
	var user_id = getUserLocalData().user_id;
	var group_id = $("#groupId").val();
	var log_num = $("#logNum").val();
	var address_detail = $("#addressDetail").html();
	var address_person=$("#addressPerson").html();
	var address_phone=$("#addressPhone").html();
	var lessNum = $("#lessNum").html();
	if(isUndefinedAndEmpty(user_id)){
		mui.toast('请先登录');
		return ;
	}
	if(isUndefinedAndEmpty(group_id)){
		mui.toast('请选择团购');
		return ;
	}
	if(isUndefinedAndEmpty(log_num)){
		mui.toast('请输入团购数量');
		return ;
	}
	if(!numberTest(log_num)){
		mui.toast('请输入数字');
		return;
	}
	if(isUndefinedAndEmpty(address_detail)){
		mui.toast('请选择收货地址');
		return;
	}
	if(isUndefinedAndEmpty(address_person)){
		mui.toast('收货人不能为空');
		return ;
	}
	if(isUndefinedAndEmpty(address_phone)){
		mui.toast('收货人电话号码不能为空');
		return ;
	}
	if(parseInt(log_num)>parseInt(lessNum)){
		mui.toast('团购数量已超过剩余数量,请重新输入');
		return ;
	}

	var json = {
		"user_id":user_id,
		"group_id":group_id,
		"log_num":log_num,
		"address_detail":address_detail,
		"address_person":address_person,
		"address_phone":address_phone,		
	};
	
	var jsonAjax = {
		"url" : "app_joinGroup.do",
		"jsonData" : json,
		"methodName" : "updateOver_back",
		"overMethodName":"changeDelete",
		"is_login":"y"
	};
	getAjaxData(jsonAjax);
}
function changeDelete(jsonObj) {
	var jsonInfo = strToJson(jsonObj.data);
	var data = strToJson(jsonInfo.data);
	log_id=data.log_id;
	$("#bg3").css("display","block");
}
var log_id='';
function changname_cancel() {
	document.getElementById("bg1").style.display = "none";
}

/**
 * 选择收货地址
 */
function changAddress(){
	var userId = getUserLocalData().user_id;
	mui.openWindow({
		url:"groupAddress.html",
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
}

$('#logNum').bind('input propertychange', function() {  
	var proPrice = $("#groupPrice").html();
	var buyNum = $("#logNum").val();
	var theResult = strToFloat(proPrice) *strToFloat(buyNum);
    $('#theCountNum').html('￥'+strToFixed(theResult,2)+'元');  
}); 
/*************************************支付*********************************/
var channel = null;
var channels = null;
var pays = {};

function plusReady() {
	// 获取支付通道
	plus.payment.getChannels(function(cs) {
		channels = cs;
	}, function(e) {
		alert("获取支付通道失败：" + e.message);
	});
}
document.addEventListener('plusready', plusReady, false);
var w = null;
//调用支付
function pay(type) {
	var id = type;
	var money = $("#theCountNum").html();
	if(isUndefinedAndEmpty(getUserLocalData().user_id)) {
		mui.toast('请重新登录进行支付！');
		return;
	}
	var alipayserver = path_url + 'ali_pay.do?money=' + money + '&user_id=' + getUserLocalData().user_id + '&order_ids=' + log_id + '&type=3';
	var wxpayserver = path_url + 'wx_payApp.do?money=' + money + '&user_id=' + getUserLocalData().user_id + '&order_ids=' + log_id + '&type=3';
	plus.nativeUI.showWaiting();
	//获取支付通道
	for(var i in channels) {
		if(channels[i].id == id) {
			channel = channels[i];
		}
	}
	if(id == 'alipay') {
		//获取支付通道
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			switch(xhr.readyState) {
				case 4:
					if(xhr.status == 200) {
						plus.payment.request(channel, xhr.responseText, function(result) {
							$("#bg3").css("display","none");
							getGroupContent(groupId);
						}, function(error) {
							plus.nativeUI.alert("支付失败");
						});
					} else {
						alert("获取订单信息失败！");
					}
					break;
				default:break;
			}
		}
		xhr.open('GET', alipayserver);
		xhr.send();
	} else if(id == 'wxpay') {
		//获取支付通道
		mui.get(wxpayserver, {}, function(data) {
			var varpay = {
				retcode: 0,
				retmsg: "ok",
				appid: data.appid,
				noncestr: data.noncestr,
				package: data.package,
				partnerid: data.partnerid,
				prepayid: data.prepayid,
				timestamp: data.timestamp,
				sign: data.sign
			};
			plus.payment.request(channel, varpay, function(result) {
				$("#bg3").css("display","none");
				getGroupContent(groupId);
			}, function(e) {
				plus.nativeUI.alert("支付失败");
			});
		}, "json");
	}
	plus.nativeUI.closeWaiting();

}