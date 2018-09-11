mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	getAllAddress(self.userId);
	
});

function getAllAddress(userId){
	var json={
		"user_id":userId
	}
	var jsonAjax={
		"url":"app_groupUserAllAddress.do",
		"jsonData":json,
		"methodName":"getAllAddress_back"
	}
	getAjaxData(jsonAjax);
}

function getAllAddress_back(jsonObj){
	var json=strToJson(jsonObj.data);
	var data=strToJson(json.data);
	var content='';
	$.each(data, function(e,obj) {
		content+='<div  class="content" onclick=getThisAddress("'+obj.address_id+'") ><span id="pp'+obj.address_id+'" class="content-text">'+obj.address_person+'</span>';
		content+='<span id="hh'+obj.address_id+'" class="content-text1">'+obj.address_phone+'</span>';
		content+='<p id="dd'+obj.address_id+'" class="content-text2">'+obj.address_detail+'</p></div>';
	});
	$("#addressList").html(content);
}

function getThisAddress(id) {
	var address_person=$("#pp"+id).html();
	var address_phone=$("#hh"+id).html();
	var address_detail=$("#dd"+id).html();
	var json={
		"address_person":address_person,
		"address_phone":address_phone,
		"address_detail":address_detail,
	}
	//将参数传回上一个页面"json"
	var mainPage = plus.webview.currentWebview().opener();//拿到父页面对象
    mui.fire(mainPage,"setAddressID",json);//fire通讯
    mui.back();
}







