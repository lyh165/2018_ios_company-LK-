$(function(){
	getAddress();
});
function initData(){
	closePage("shouhoudizhi_update");
	getAddress();
}
function getAddress() {
	$("#nullAddress").html('');
	$("#add").html('');
	$("#dibuadd").html('');
	var json = {
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_getAllAddress.do",
		"jsonData": json,
		"methodName": "getAddress_back",
	}
	getAjaxData(jsonAjax);
}

function getAddress_back(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var content = '';
	if(data.length == 0) {
		content += '<div class="shopping_cart"><img src="../../../form_mobile/util/img/dizhi006.png"/></div>';
		content += '<div class="text1"><span class="text_1">暂无收货地址哦</span></div>';
		content += '<div class="get-code1"><button class="get-code" onclick=addAddress()><span>+</span>新建地址</button></div>';
		$("#nullAddress").html(content);
	} else {
		$.each(data, function(e, obj) {
			var phoneNum = obj.address_phone;
			var beforeThree = phoneNum.slice(0,3);
			var afterFour = phoneNum.slice(7);
			content += '<div class="content" ><span class="content-text">'+obj.address_person;
			content += '</span><span class="content-text1">'+beforeThree+'****'+afterFour;
			content += '</span><p class="content-text2">'+obj.address_area+obj.address_detail;
			content += '</p></div><div class="content1"><div class="mui-card1">';
			content += '<div class="mui-input-row mui-radio mui-left">';
			content += '<span onclick=moren("'+obj.address_id+'")>';//单选按钮
			if(obj.address_is_default=='1'){
				content+='<input name="radio" type="radio"checked="checked"></span>';
			}else{
				content+='<input name="radio" type="radio"></span>';
			}
			content += '<span class="moren123">设为默认</span>';
			content += '<span class="shuanchu" onclick=changeDelete("'+obj.address_id+'")>';
			content += '<span class="del"><img src="../../../form_mobile/util/img/lajitong.png"/>';
			content += '</span><span class="moren text-del">删除</span></span>';
			content += '<span onclick=updateAddress("'+obj.address_id+'")>';
			content += '<span class="del2"><img src="../../../form_mobile/util/img/bianji.png"/>';
			content += '</span><span class="moren text-del2">编辑</span></span>';
			content += '</div></div></div>';
		});
		$("#add").html(content);
		$("#dibuadd").html('<div class="bg"><button class="button button1" onclick=addAddress()><span>+</span>新建地址</button></div>');
	}
}
//新增地址
function addAddress(){
	mui.openWindow({
		url: 'shouhoudizhi_update.html',
		id: 'shouhoudizhi_update',
	});
}
//删除地址
var del_id;
function changeDelete(id){
	del_id=id;
	$("#delTankuang").css("display","block");
}
function changname_cancel(){
	$("#delTankuang").css("display","none");
}
function changename_sure(){
	$("#delTankuang").css("display","none");
	var json = {
		"address_id": del_id,
	}
	var jsonAjax = {
		"url": "app_deleteAddress.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "getAddress",
	}
	getAjaxData(jsonAjax);
}
//编辑地址
function updateAddress(id){
	mui.openWindow({
		url: 'shouhoudizhi_update.html',
		id: 'shouhoudizhi_update',
		extras: { //这是要传的数据
			"address_id": id,
		},
	});
}
//修改默認
function moren(id){
	var json = {
		"address_id": id,
		"user_id":getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_updateDefaultAddress.do",
		"jsonData": json,
		"methodName": "updateOver_back",
		"overMethodName": "moren_back",
	}
	getAjaxData(jsonAjax);
}
function moren_back(jsonObj){}

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
	if (isUndefinedAndEmpty(obj.address_id)) {
		content+='<div onclick="openShoujiadizhi()"><span class="location"><img src="../../../form_mobile/util/img/u13.png"></span>';
		content+='<span class="content-text">你还没有设置收货地址,点击去添加</span></div>';
		
	}else{
		content+='<div onclick="changAddress()"><span class="location"><img src="../../../form_mobile/util/img/u13.png"></span>';
		content+='<span id="addressPerson" class="content-text">'+obj.address_person+'</span><span id="addressPhone" class="content-text">'+obj.address_phone+'</span>';
		content+='<span id="addressDetail" class="content_location">'+obj.address_detail+'</span>';
		content+='<span class="right_arrow right"><img src="../../../form_mobile/util/img/jiantou.png"/></span></div>';
	}
	$("#defaultAddress").html(content);
}	
