jQuery(function(){
	get_special_zone();
})

/*******************获取特价专区*************************/
function get_special_zone() {
	var jsonAjax = {
		"url": "app_special_zone_index.do",
		"methodName": "updateOver_back",
		"overMethodName": "getSpecialZoneResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}

function getSpecialZoneResult(jsonObj) {
	var jsonData = strToJson(jsonObj.data);
	var data = strToJson(jsonData.data);
	var content = '';
	$("#searchData_1").html("");
	if(data.length == 0) {
		$("#tejia_show").css("display", "none");
	} else {
		$.each(data, function(e, obj) {
			var money = parseFloat(obj.sku_money); //获取价格
			var moneys = money * 0.2 + money; //价格乘以20%
			content += '<li class="li">' +
				'	<input type="text" style="display: none;" value="' + obj.product_id + '" id="product_id" />' +
				' 	<div class="mui-media-object"  onclick="openShopProByUserShopIdBySkuID(&quot;' + obj.shop_id + '&quot;,&quot;' + obj.product_id + '&quot;,&quot;' + obj.sku_id + '&quot;)"><img src="' + path_url_img + obj.product_logo + '" style="width: 10.18rem;"/></div>' +
				'  	<div class="mui-media-body">' + obj.product_name + ' </div>' +
				'	<div class="price1">' +
				'<span class="price">￥' + obj.sku_money + ' <del>￥' + moneys + '</del></span>' +
				'<span class="shopping" onclick=addCart(&quot;' + obj.product_id +
				'&quot;,&quot;' + obj.sku_id + '&quot;,1)>库存' + obj.product_inventory + '</span></div></li>';//<img src="../../form_mobile/util/img/gouwuche1.png" style="width: 1.68rem"/>
		});
		$("#searchData_1").html(content);
	}
}


function getSearchShopPro() {
	var search_val = $("#sousuo").val();
	var json = {
		"attribute_val": search_val,
	}
	var jsonAjax = {
		"url": "app_special_zone_index.do",
		"jsonData":json,
		"methodName": "updateOver_back",
		"overMethodName": "getSpecialZoneResult",
		"is_login": "n"
	}
	getAjaxData(jsonAjax);
}