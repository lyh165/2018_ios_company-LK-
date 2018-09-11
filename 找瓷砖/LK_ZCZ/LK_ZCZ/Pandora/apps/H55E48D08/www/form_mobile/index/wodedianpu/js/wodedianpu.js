mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var shop_id=self.shop_id;
	getBusinessByShopId(self.shop_id);
});


function initData(){
	mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var shop_id=self.shop_id;
	getBusinessByShopId(shop_id);
});
}

//通过编号获取商家信息
function getBusinessByShopId(shop_id){
	json={
		"shop_id":shop_id
	}
	var jsonAjax = {
		"url": "app_business_logistics_by_shop_id_index.do",
		"jsonData":json,
		"methodName": "BusinessLogisticsByShopIdResult",
		"is_login":"n"
	}
	getAjaxData(jsonAjax);
}
//绑定商家信息
function BusinessLogisticsByShopIdResult(jsonObj){
	var jsonData =strToJson(jsonObj.data);
	var data = strToJson(jsonData.data); 
	$("#shop_logo").attr("src",path_url_img+data.shop_logo);
	$("#shop_id").val(data.shop_id);
	$("#shop_name").text(data.shop_name);
	
	var ss=strToJson(data.shop_subject);
	var count="";
	for(var k in ss){
		count+='<span class="content-text2" >'+ss[k]+'</span>'
	}
	$("#shop_subject").html(count);
	
	var sr=strToJson(data.shop_range);
	var count_1="";
	for(var k in sr){
		count_1+=sr[k]+'、'
	}
	$("#shop_range").html(count_1);
	var sse=strToJson(data.shop_service);
	var count_2="";
	for(var k in sse){
		count_2+='<span class="content-text5">'+sse[k]+'</span>'
	}
	$("#shop_service").html(count_2);
	$("#shop_profile").text(data.shop_profile);
	
	var ssi=strToJson(data.shop_show_img);
	var count_3="";
	for(var k in ssi){
		count_3+='<img src="'+path_url_img+ssi[k]+'" data-preview-src="" data-preview-group="1" />'
	}
	$("#shop_show_img").html(count_3);
	$("#shop_show_add").text(data.shop_show_add);
	
	var swi=strToJson(data.shop_warehouse_img);
	var count_4="";
	for(var k in swi){
		count_4+='<img src="'+path_url_img+swi[k]+'"data-preview-src="" data-preview-group="1" />'
	}
	$("#shop_warehouse_img").html(count_4);
//	$("#shop_warehouse_add").text(data.shop_warehouse_add);
	
//	alert(1);
	var ckAddress = data.shop_warehouse_add.split(',');
	for(var i = 0;i<ckAddress.length;i++){
		jQuery('.ckAddress').prepend('<div class="content-text10 mui-navigate-right"><span>'+ ckAddress[i] +'</span></div>')
	}
	
	
	
	var sfi=strToJson(data.shop_factory_img);
	var count_5="";
	for(var k in sfi){
		count_5+='<img src="'+path_url_img+sfi[k]+'" data-preview-src="" data-preview-group="1" />'
	}
	$("#shop_factory_img").html(count_5);
	$("#shop_factory_add").text(data.shop_factory_add);	
	
}

//跳转到店铺所有商品页面
function  openBusinessShopProAll(){
	var shop_id=$("#shop_id").val();
	var page = plus.webview.getWebviewById("business-shop");
		if(page) {
			page.evalJS("initData()");
		}
		mui.openWindow({
			url: '../business-shop/businessi.html',
		id: 'business-shop',
		extras: { //这是要传的数据
			"shop_id":shop_id
		},
	});
}

/*定位*/
function openAddress(shop_id){
	mui.openWindow({
		url: "/form_mobile/index/Location.html",
		id:"Location",
		extras: {
			"shop_id":$("#shop_id").val()
		},
	})
}
