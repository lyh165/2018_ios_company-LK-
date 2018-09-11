mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var shop_id = self.shop_id;
	$("#shop_id").val(shop_id)
	getShopPorByShopId();
	getLogisticsByShopId();
	getUserShopRecruit();
	getBusiness_Service();
	getBusiness_Process();
});

function initData() {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var shop_id = self.shop_id;
		$("#shop_id").val(shop_id);
		getShopPorByShopId();
		getLogisticsByShopId();
		getUserShopRecruit();
		getBusiness_Service();
		getBusiness_Process();
		closewindou();
	});
}

function closewindou() {
	// 获取当前webview窗口对象
	var curr = plus.webview.currentWebview();
	var wvs = plus.webview.all();
	for(var i = 0, len = wvs.length; i < len; i++) {
		//关闭除当前页面外的其他页面
		if(wvs[i].getURL() == curr.getURL())
			//遇到当前页跳过
			continue;
		//非当前页执行关闭
		plus.webview.close(wvs[i]);
	}
}

//获取商家商家商品
function getShopPorByShopId() {
	json = {
		"shop_id": $("#shop_id").val()
	}
	var jsonAjax = {
		"url": "app_shop_info_search_by_shop_id.do",
		"jsonData": json,
		"methodName": "getShopPorByShopIdResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}
$("#shop_proData").html("");

function getShopPorByShopIdResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	$.each(data, function(e, obj) {
//		var ss = strToJson(obj.sku_name);
//		var suk_name = "";
//		for(var k in ss) {
//			suk_name += ss[k] + " ";
//		}
		var ssu = strToJson(obj.shop_subject);
		var shop_subject = "";
		for(var k in ssu) {
			if(ssu[k] == "自营") {
				shop_subject = "自营";
			} else {
				shop_subject = "非自营";
			}
		}
		$("#shop_proData").before('<li class="li_1" onclick="openShopProByUserShopIdBySkuID(&quot;' + obj.shop_id + '&quot;,&quot;' + obj.product_id + '&quot;,&quot;' + obj.sku_id + '&quot;)">' +
			'    	  	<a href="#" style="right: 5px;">' +
			'          	<div class="mui-media-object_1" ><img src="' + path_url_img + obj.product_logo + '"/></div>' +
			'         </a>' +
			'       	<div class="mui-media-body_1">' +
			'       		<span class="ziying_1">' + shop_subject + '</span> ' +
			'       		<span class="mui-media-body-text_1">' + obj.product_name + '</span>' +
			'       	</div>' +
			'       	<span class="specifications_1">' + obj.product_attribute_val + '</span>' +
			'    	<div class="price1_1">' +
			'    		<span class="price_1"><small>￥</small>' + obj.sku_money + '</span>' +
			'    		<span class="shopping_1">库存' + obj.product_inventory + '</span>' +
			'    	</div>' +
			'	</li>');
	});
}

//商品详情
function openShopProByUserShopIdBySkuID(shop_id, product_id, sku_id) {
	var page = plus.webview.getWebviewById("shopProDetails");
	if(page) {
		page.evalJS("initData()");
	}
	mui.openWindow({
		url: "../details/shopProDetails/shop.html",
		id: "shop",
		extras: {
			"shop_id": shop_id,
			"product_id": product_id,
			"sku_id": sku_id
		}
	});
}