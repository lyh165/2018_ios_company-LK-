$(function(){
	getCollection();
});
function getCollection(){
	var json = {
		"user_id": getUserLocalData().user_id,
	}
	var jsonAjax = {
		"url": "app_getUserCollection.do",
		"jsonData": json,
		"methodName": "getCollection_back",
	}
	getAjaxData(jsonAjax);
}
function getCollection_back(jsonObj){
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var content = '';
	if(data.length==0){
		content+='<div class="shopping_cart"><img src="../../util/img/shoucang.png" /></div><div class="text1"><span class="text_1">暂无收藏哦</span>';
		$("#collection").html(content);
	}else{
		$.each(data, function(e, obj) {
			content+='<div class="content" id="collection'+obj.collection_id+'"><div onclick=openShop("'+obj.product_id+'","'+obj.sku_id+'","'+obj.shop_id+'")>';
			content+='<span class="shop"><img src="'+path_url_img +obj.product_logo+'" /></span>';
			content+='<span class="content-text">'+obj.product_name+'</span>';
			content+='<span class="content-text1">'+obj.shop_name+'</span>';
			content+='</div><button class="button" onclick=delCollection("'+obj.collection_id+'")>取消收藏</button></div>';
		});
		$("#collection").html(content);
	}
}
//取消收藏
function delCollection(id){
	var json = {
		"collection_id": id,
	}
	var jsonAjax = {
		"url": "app_deleteUserCollection.do",
		"jsonData": json,
		"methodName": "delCollection_back",
		"collection_id": id,
	}
	getAjaxData(jsonAjax);
}
function delCollection_back(jsonObj){
	$("#collection"+jsonObj.collection_id).remove();
}
function openShop(id,skuId,shopId){
	mui.openWindow({
 		url: "../../index/details/shopProDetails/shop.html",
 		id:"shop",
 		extras:{
			"product_id":id,
			"sku_id":skuId,
			"shop_id":shopId,
		}
 	});
}
